import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserExerciseAttempt } from "../entities/user-exercise-attempt.entity";
import { UserExerciseAttemptRepository } from "../repository/user-exercise-attempt-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";
import { ExerciseService } from "@module/exercise/services/exercise.service";
import { LessonVocabularyService } from "@module/lesson-vocabulary/services/lesson-vocabulary.service";
import { UserVocabularyProgressService } from "@module/user-vocabulary-progress/services/user-vocabulary-progress.service";
import {
    FlashcardSwipeDto,
    FlashcardSwipeOutcome,
} from "@module/user-vocabulary-progress/dto/flashcard-swipe.dto";

@Injectable()
export class UserExerciseAttemptService extends BaseService<
    UserExerciseAttempt,
    UserExerciseAttemptRepository
> {
    constructor(
        @InjectRepository(Entity.USER_EXERCISE_ATTEMPT)
        private readonly userExerciseAttemptRepository: UserExerciseAttemptRepository,
        private readonly exerciseService: ExerciseService,
        private readonly lessonVocabularyService: LessonVocabularyService,
        private readonly userVocabularyProgressService: UserVocabularyProgressService,
    ) {
        super(userExerciseAttemptRepository, {
            notFoundCode: "error-user-exercise-attempt-not-found",
        });
    }

    private normalizeWord(input: unknown): string {
        return String(input ?? "")
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();
    }

    private async getVocabIdsFromExercise(
        user: User,
        exercise: any,
    ): Promise<string[]> {
        const content = exercise?.content ?? {};
        const type = exercise?.type;
        const lessonId = exercise?.lesson_id;

        const vocabIds = new Set<string>();

        if (type === "matching") {
            const left = Array.isArray(content?.left) ? content.left : [];
            for (const item of left) {
                const id = item?.id;
                if (id) vocabIds.add(String(id));
            }
            return [...vocabIds];
        }

        if (type === "fill_in_blank") {
            if (!lessonId) return [];

            const lessonVocabItems: any[] =
                await this.lessonVocabularyService.getMany(
                    user,
                    { lesson_id: lessonId } as any,
                    {
                        sort: { order_index: 1 },
                        enableDataPartition: false,
                    } as any,
                );

            const wordToVocabId = new Map<string, string>();
            for (const lv of lessonVocabItems) {
                const word = this.normalizeWord(lv?.vocabulary?.word);
                if (word && lv?.vocab_id) {
                    if (!wordToVocabId.has(word)) {
                        wordToVocabId.set(word, String(lv.vocab_id));
                    }
                }
            }

            const sentences = Array.isArray(content?.sentences)
                ? content.sentences
                : [];
            for (const s of sentences) {
                const answers: string[] = Array.isArray(s?.answers)
                    ? s.answers
                    : [];
                for (const w of answers) {
                    const id = wordToVocabId.get(this.normalizeWord(w));
                    if (id) vocabIds.add(id);
                }
            }

            return [...vocabIds];
        }

        if (typeof type === "string" && type.startsWith("speaking_")) {
            const vid = exercise?.vocab_id;
            return vid ? [String(vid)] : [];
        }

        if (type === "pronunciation") {
            if (!lessonId) return [];

            const lessonVocabItems: any[] =
                await this.lessonVocabularyService.getMany(
                    user,
                    { lesson_id: lessonId } as any,
                    {
                        sort: { order_index: 1 },
                        enableDataPartition: false,
                    } as any,
                );

            const wordToVocabId = new Map<string, string>();
            for (const lv of lessonVocabItems) {
                const word = this.normalizeWord(lv?.vocabulary?.word);
                if (word && lv?.vocab_id) {
                    if (!wordToVocabId.has(word)) {
                        wordToVocabId.set(word, String(lv.vocab_id));
                    }
                }
            }

            const questions = Array.isArray(content?.questions)
                ? content.questions
                : [];
            for (const q of questions) {
                const correctAnswer = q?.correctAnswer;
                const id = wordToVocabId.get(this.normalizeWord(correctAnswer));
                if (id) vocabIds.add(id);
            }

            return [...vocabIds];
        }

        return [...vocabIds];
    }

    async create(user: User, dto: Partial<UserExerciseAttempt>, options?: any) {
        // Đảm bảo user_id luôn đúng theo người đang đăng nhập.
        const payload: Partial<UserExerciseAttempt> = {
            ...dto,
            user_id: user._id,
        };
        const created = await super.create(user, payload, options);

        // Nếu chưa có kết quả đúng/sai thì không update progress
        if (typeof payload.is_correct !== "boolean") {
            return created;
        }

        try {
            const exercise = await this.exerciseService.getById(
                user,
                created.exercise_id,
                { enableDataPartition: false } as any,
            );

            const vocabIds = await this.getVocabIdsFromExercise(user, exercise);

            if (!vocabIds.length) return created;

            const outcome = payload.is_correct
                ? FlashcardSwipeOutcome.REMEMBERED
                : FlashcardSwipeOutcome.NOT_REMEMBERED;

            await Promise.all(
                vocabIds.map((vocab_id) =>
                    this.userVocabularyProgressService.recordFlashcardSwipe(
                        user,
                        {
                            vocab_id,
                            outcome,
                        } as FlashcardSwipeDto,
                    ),
                ),
            );
        } catch {
            // Không chặn việc tạo attempt nếu update progress gặp lỗi.
        }

        return created;
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserExerciseAttempt>,
    ): Promise<UserExerciseAttempt[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserExerciseAttempt>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
