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
import { FlashcardVocabState } from "../types/flashcard-state.types";
import { LessonVocabularyModel } from "@module/lesson-vocabulary/models/lesson-vocabulary.model";

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
    ) {
        super(userVocabularyProgressRepository, {
            notFoundCode: "error-user-vocabulary-progress-not-found",
        });
    }

    static computeIsRemembered(count: number | undefined): boolean {
        return (count ?? 0) >= FLASHCARD_REMEMBERED_THRESHOLD;
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
            const c = row.flashcard_remembered_count ?? 0;
            map.set(row.vocab_id, {
                flashcard_remembered_count: c,
                is_remembered:
                    UserVocabularyProgressService.computeIsRemembered(c),
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

        let nextCount = existing?.flashcard_remembered_count ?? 0;
        if (dto.outcome === FlashcardSwipeOutcome.NOT_REMEMBERED) {
            nextCount = 0;
        } else {
            nextCount = Math.min(FLASHCARD_REMEMBERED_THRESHOLD, nextCount + 1);
        }

        const isMastered =
            UserVocabularyProgressService.computeIsRemembered(nextCount);
        const now = new Date().toISOString();
        const times = (existing?.times_practiced ?? 0) + 1;

        const payload: Partial<UserVocabularyProgress> = {
            user_id: user._id,
            vocab_id: dto.vocab_id,
            flashcard_remembered_count: nextCount,
            is_mastered: isMastered,
            times_practiced: times,
            last_practiced: now,
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
                flashcard_remembered_count: 0,
                is_mastered: false,
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
