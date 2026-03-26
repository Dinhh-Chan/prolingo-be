import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserVocabularyProgress } from "../entities/user-vocabulary-progress.entity";
import { UserVocabularyProgressRepository } from "../repository/user-vocabulary-progress-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";
import { FLASHCARD_REMEMBERED_THRESHOLD } from "../constants/flashcard.constant";
import {
    FlashcardSwipeDto,
    FlashcardSwipeOutcome,
} from "../dto/flashcard-swipe.dto";
import { VocabularyService } from "@module/vocabulary/services/vocabulary.service";
import { FlashcardVocabState } from "../types/flashcard-state.types";
import { LessonVocabularyModel } from "@module/lesson-vocabulary/models/lesson-vocabulary.model";
import { FlashcardSessionStartDto } from "../dto/flashcard-session-start.dto";

@Injectable()
export class UserVocabularyProgressService extends BaseService<
    UserVocabularyProgress,
    UserVocabularyProgressRepository
> {
    constructor(
        @InjectRepository(Entity.USER_VOCABULARY_PROGRESS)
        private readonly userVocabularyProgressRepository: UserVocabularyProgressRepository,
        @InjectModel(LessonVocabularyModel)
        private readonly lessonVocabularyModel: typeof LessonVocabularyModel,
        private readonly vocabularyService: VocabularyService,
    ) {
        super(userVocabularyProgressRepository, {
            notFoundCode: "error-user-vocabulary-progress-not-found",
        });
    }

    static computeIsRemembered(count: number | undefined): boolean {
        return (count ?? 0) >= FLASHCARD_REMEMBERED_THRESHOLD;
    }

    static normalizeLevel(level: number | undefined): number {
        const raw = Number(level ?? 0);
        if (raw <= 1) return 1;
        if (raw >= 4) return 4;
        return raw;
    }

    static intervalDaysByLevel(level: number): number {
        // 1 -> 1, 2 -> 3, 3 -> 7, 4 -> 14 (sau đúng tiếp => 30)
        switch (level) {
            case 2:
                return 3;
            case 3:
                return 7;
            case 4:
                return 14;
            case 1:
            default:
                return 1;
        }
    }

    static quizTypeByLevel(level: number): string {
        switch (level) {
            case 1:
                return "flashcard_quiz_meaning";
            case 2:
                return "quiz_meaning_to_word";
            case 3:
                return "matching_word_meaning";
            case 4:
                return "fill_in_blank";
            default:
                return "flashcard_quiz_meaning";
        }
    }

    static addDays(now: Date, days: number): Date {
        return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    }

    /** Lấy map vocab_id → trạng thái flashcard cho user hiện tại. */
    async getFlashcardStateMap(
        user: User,
        vocabIds: string[],
    ): Promise<Map<string, FlashcardVocabState>> {
        const map = new Map<string, FlashcardVocabState>();
        if (!vocabIds?.length) {
            return map;
        }
        const unique = [...new Set(vocabIds)];
        const rows = await this.userVocabularyProgressRepository.getMany(
            {
                user_id: user._id,
                vocab_id: { $in: unique },
            } as any,
            { enableDataPartition: false } as any,
        );
        for (const row of rows) {
            const lastCorrect = row.flashcard_remembered_count ?? 0;
            const level = UserVocabularyProgressService.normalizeLevel(
                row.mastery_level,
            );
            map.set(row.vocab_id, {
                flashcard_remembered_count: lastCorrect,
                is_remembered:
                    UserVocabularyProgressService.computeIsRemembered(
                        lastCorrect,
                    ),
                level,
                wrong_count: row.wrong_count ?? 0,
                interval_days: row.interval_days ?? 1,
                next_review: row.next_review ?? null,
                is_weak: row.is_weak ?? false,
                weak_correct_streak: row.weak_correct_streak ?? 0,
            });
        }
        return map;
    }

    /** Ghi nhận swipe flashcard: đã nhớ (+1) hoặc chưa nhớ (reset streak). */
    async recordFlashcardSwipe(
        user: User,
        dto: FlashcardSwipeDto,
    ): Promise<UserVocabularyProgress> {
        const existing = await this.userVocabularyProgressRepository.getOne(
            {
                user_id: user._id,
                vocab_id: dto.vocab_id,
            } as any,
            { enableDataPartition: false } as any,
        );

        const now = new Date();
        const nowIso = now.toISOString();
        const times = (existing?.times_practiced ?? 0) + 1;

        const currentLevel = UserVocabularyProgressService.normalizeLevel(
            existing?.mastery_level,
        );
        const currentLastCorrect = existing?.flashcard_remembered_count ?? 0;
        const currentWrongCount = existing?.wrong_count ?? 0;
        const currentIntervalDays = existing?.interval_days ?? 1;
        const currentIsWeak = existing?.is_weak ?? false;
        const currentWeakStreak = existing?.weak_correct_streak ?? 0;

        let nextLevel = currentLevel;
        let nextLastCorrect = currentLastCorrect;
        let nextWrongCount = currentWrongCount;
        let nextIntervalDays = currentIntervalDays;
        let nextNextReview = existing?.next_review
            ? new Date(existing.next_review)
            : UserVocabularyProgressService.addDays(now, nextIntervalDays);
        let nextIsWeak = currentIsWeak;
        let nextWeakCorrectStreak = currentWeakStreak;

        if (dto.outcome === FlashcardSwipeOutcome.REMEMBERED) {
            nextWrongCount = 0;
            const prevLastCorrect = currentLastCorrect;
            nextLastCorrect = Math.min(
                FLASHCARD_REMEMBERED_THRESHOLD,
                prevLastCorrect + 1,
            );

            // Nếu đang gắn tag yếu => cộng chuỗi đúng để gỡ
            if (currentIsWeak) {
                nextWeakCorrectStreak = currentWeakStreak + 1;
                if (nextWeakCorrectStreak >= 2) {
                    nextIsWeak = false;
                    nextWeakCorrectStreak = 0;
                }
            }

            // Đủ ngưỡng đúng liên tiếp => nâng level / tăng interval
            const justReachedThreshold =
                prevLastCorrect < FLASHCARD_REMEMBERED_THRESHOLD &&
                nextLastCorrect >= FLASHCARD_REMEMBERED_THRESHOLD;

            if (justReachedThreshold) {
                if (currentLevel < 4) {
                    nextLevel = Math.min(4, currentLevel + 1);
                    nextIntervalDays =
                        UserVocabularyProgressService.intervalDaysByLevel(
                            nextLevel,
                        );
                    nextNextReview = UserVocabularyProgressService.addDays(
                        now,
                        nextIntervalDays,
                    );
                    // khi lên level thì coi như đã củng cố => không còn yếu
                    nextIsWeak = false;
                    nextWeakCorrectStreak = 0;
                } else {
                    // level 4: 14 ngày -> nếu đúng tiếp => 30 ngày
                    if (nextIntervalDays <= 14) {
                        nextIntervalDays = 30;
                    }
                    nextNextReview = UserVocabularyProgressService.addDays(
                        now,
                        nextIntervalDays,
                    );
                }
            } else {
                // đúng nhưng chưa đủ ngưỡng => vẫn giữ interval hiện tại
                nextNextReview = UserVocabularyProgressService.addDays(
                    now,
                    nextIntervalDays,
                );
            }
        } else {
            // NOT_REMEMBERED
            nextWrongCount = currentWrongCount + 1;
            nextLastCorrect = 0;
            nextLevel = Math.max(1, currentLevel - 1);
            nextIntervalDays =
                UserVocabularyProgressService.intervalDaysByLevel(nextLevel);
            nextNextReview = UserVocabularyProgressService.addDays(
                now,
                nextIntervalDays,
            );

            nextIsWeak = nextWrongCount >= 2;
            nextWeakCorrectStreak = 0;
        }

        const isMastered = nextLevel >= 4;

        const payload: Partial<UserVocabularyProgress> = {
            user_id: user._id,
            vocab_id: dto.vocab_id,
            mastery_level: nextLevel,
            flashcard_remembered_count: nextLastCorrect,
            wrong_count: nextWrongCount,
            interval_days: nextIntervalDays,
            next_review: nextNextReview.toISOString(),
            is_weak: nextIsWeak,
            weak_correct_streak: nextWeakCorrectStreak,
            is_mastered: isMastered,
            times_practiced: times,
            last_practiced: nowIso,
        };

        if (existing?._id) {
            const updated =
                await this.userVocabularyProgressRepository.updateById(
                    existing._id,
                    payload as any,
                    { enableDataPartition: false } as any,
                );
            return (updated ?? {
                ...existing,
                ...payload,
            }) as UserVocabularyProgress;
        }

        return this.create(
            user,
            payload as any,
            {
                enableDataPartition: false,
            } as any,
        );
    }

    /** Reset toàn bộ flashcard trong lesson về “chưa nhớ” (count = 0). */
    async resetFlashcardForLesson(
        user: User,
        lessonId: string,
    ): Promise<{ reset: number }> {
        const links = await this.lessonVocabularyModel.findAll({
            where: { lesson_id: lessonId },
            attributes: ["vocab_id"],
        });
        const vocabIds = links.map((l) => l.vocab_id).filter(Boolean);
        if (!vocabIds.length) {
            return { reset: 0 };
        }

        let reset = 0;
        for (const vocabId of vocabIds) {
            const existing = await this.userVocabularyProgressRepository.getOne(
                {
                    user_id: user._id,
                    vocab_id: vocabId,
                } as any,
                { enableDataPartition: false } as any,
            );
            const payload: Partial<UserVocabularyProgress> = {
                mastery_level: 1,
                flashcard_remembered_count: 0,
                wrong_count: 0,
                interval_days: 1,
                next_review: new Date().toISOString(),
                is_mastered: false,
                is_weak: false,
                weak_correct_streak: 0,
            };
            if (existing?._id) {
                await this.userVocabularyProgressRepository.updateById(
                    existing._id,
                    payload as any,
                    { enableDataPartition: false } as any,
                );
                reset += 1;
            }
        }
        return { reset };
    }

    /**
     * Mixer theo phiên flashcard:
     * - Old/Due = next_review <= now hoặc is_weak
     * - New = còn lại (hoặc chưa có progress)
     * - Trộn ~70% new / 30% old, session size 5-8
     */
    async startFlashcardSession(
        user: User,
        dto: FlashcardSessionStartDto,
    ): Promise<any> {
        const now = new Date();
        const sessionSize = dto.session_size ?? 7;

        const links = await this.lessonVocabularyModel.findAll({
            where: { lesson_id: dto.lesson_id },
            attributes: ["vocab_id", "order_index"],
            order: [["order_index", "ASC"]],
        });
        const allVocabIds = links.map((l: any) => l.vocab_id).filter(Boolean);
        if (!allVocabIds.length) {
            return {
                session_size: sessionSize,
                cards: [],
                speaking_task: null,
            };
        }

        const flashMap = await this.getFlashcardStateMap(user, allVocabIds);

        const defaultState = {
            level: 1,
            wrong_count: 0,
            interval_days: 1,
            next_review: null,
            is_weak: false,
            weak_correct_streak: 0,
            flashcard_remembered_count: 0,
            is_remembered: false,
        } as FlashcardVocabState;

        const oldPool: any[] = [];
        const newPool: any[] = [];

        for (const link of links as any[]) {
            const vocabId = link.vocab_id;
            const state = flashMap.get(vocabId) ?? defaultState;

            const nextReviewAt = state.next_review
                ? new Date(state.next_review)
                : null;
            const isDue =
                Boolean(state.is_weak) ||
                (nextReviewAt
                    ? nextReviewAt.getTime() <= now.getTime()
                    : false);

            const item = {
                vocab_id: vocabId,
                order_index: link.order_index,
                state,
            };

            if (isDue) oldPool.push(item);
            else newPool.push(item);
        }

        // Sort old: weak first, then next_review asc, then wrong_count desc
        oldPool.sort((a, b) => {
            const aWeak = a.state.is_weak ? 1 : 0;
            const bWeak = b.state.is_weak ? 1 : 0;
            if (aWeak !== bWeak) return bWeak - aWeak;
            const aDue = a.state.next_review
                ? new Date(a.state.next_review).getTime()
                : Number.POSITIVE_INFINITY;
            const bDue = b.state.next_review
                ? new Date(b.state.next_review).getTime()
                : Number.POSITIVE_INFINITY;
            if (aDue !== bDue) return aDue - bDue;
            return (b.state.wrong_count ?? 0) - (a.state.wrong_count ?? 0);
        });

        // Sort new by lesson order
        newPool.sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));

        const newCount = Math.max(0, Math.round(sessionSize * 0.7));
        const oldCount = Math.max(0, sessionSize - newCount);

        const selectedNew = newPool.slice(0, newCount);
        const selectedOld = oldPool.slice(0, oldCount);
        let selected = [...selectedNew, ...selectedOld];

        // Nếu thiếu, fill tiếp từ pool còn lại
        if (selected.length < sessionSize) {
            const remain = [...newPool, ...oldPool].filter(
                (x) => !selected.some((s) => s.vocab_id === x.vocab_id),
            );
            selected = selected.concat(
                remain.slice(0, sessionSize - selected.length),
            );
        }

        // Fetch vocabulary data
        const cards = [];
        for (const item of selected) {
            const vocab = await this.vocabularyService.getById(
                user,
                item.vocab_id,
                { enableDataPartition: false } as any,
            );
            if (!vocab) continue;

            cards.push({
                vocab_id: item.vocab_id,
                order_index: item.order_index,
                word: vocab.word,
                meaning: vocab.definition_vi,
                audio_url: vocab.audio_url,
                image_url: vocab.image_url,
                level: item.state.level ?? 1,
                is_weak: item.state.is_weak ?? false,
                next_review_at: item.state.next_review ?? null,
                interval_days: item.state.interval_days ?? 1,
                quiz_type: UserVocabularyProgressService.quizTypeByLevel(
                    item.state.level ?? 1,
                ),
                is_remembered: item.state.is_remembered ?? false,
            });
        }

        // speaking task: chọn từ có level cao nhất trong cards
        const speakingTarget = cards
            .slice()
            .sort((a, b) => (b.level ?? 1) - (a.level ?? 1))[0];

        return {
            lesson_id: dto.lesson_id,
            session_size: sessionSize,
            cards,
            speaking_task: speakingTarget
                ? {
                      target_word: speakingTarget.word,
                      instruction:
                          "Use the target word in a short sentence about your project.",
                  }
                : null,
        };
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserVocabularyProgress>,
    ): Promise<UserVocabularyProgress[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserVocabularyProgress>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
