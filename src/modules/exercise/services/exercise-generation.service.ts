import { Injectable } from "@nestjs/common";
import { LessonVocabularyService } from "@module/lesson-vocabulary/services/lesson-vocabulary.service";
import { User } from "@module/user/entities/user.entity";
import { ExerciseService } from "./exercise.service";
import { GenerateExercisesForLessonDto } from "../dto/generate-exercises-for-lesson.dto";

function escapeRegExp(input: string): string {
    // Escape để dùng an toàn trong RegExp
    return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

@Injectable()
export class ExerciseGenerationService {
    constructor(
        private readonly lessonVocabularyService: LessonVocabularyService,
        private readonly exerciseService: ExerciseService,
    ) {}

    private isVocabDue(vocab: any, now: Date): boolean {
        const level = Number(vocab?.level ?? 1);
        const nextReviewAt = vocab?.next_review_at ?? null;
        const nextReviewTime = nextReviewAt ? new Date(nextReviewAt) : null;
        const due =
            !nextReviewTime || nextReviewTime.getTime() <= now.getTime();

        // Theo spec: "chưa đạt" = level<4 và (đang yếu hoặc đến lịch ôn)
        return level < 4 && (Boolean(vocab?.is_weak) || due);
    }

    /**
     * Sinh bài tập cho 1 lesson, chỉ sử dụng vocab chưa đạt theo progress (level<4 + due/weak).
     */
    async generateForLesson(
        user: User,
        dto: GenerateExercisesForLessonDto,
    ): Promise<{
        created_exercise_ids: string[];
        selected_vocab_ids: string[];
    }> {
        const lessonId = dto.lesson_id;
        const limit = dto.limit ?? 10;

        const lessonVocabItems: any[] =
            await this.lessonVocabularyService.getMany(
                user,
                { lesson_id: lessonId } as any,
                {
                    sort: { order_index: 1 },
                    enableDataPartition: false,
                } as any,
            );

        const now = new Date();
        const dueItems = lessonVocabItems.filter((v) =>
            this.isVocabDue(v, now),
        );
        const selected = dueItems.slice(0, limit);
        const selectedVocabIds = selected
            .map((v) => v.vocab_id)
            .filter(Boolean);

        if (!selected.length) {
            return {
                created_exercise_ids: [],
                selected_vocab_ids: selectedVocabIds,
            };
        }

        const vocabularies = selected
            .map((item) => item.vocabulary)
            .filter(Boolean);

        const created: string[] = [];

        // 1) Matching
        if (vocabularies.length > 0) {
            const matching = await this.exerciseService.createMatchingExercise(
                user,
                lessonId,
                vocabularies,
            );
            created.push(matching?._id);
        }

        // 2) Fill-in-blank (dựa trên sentence_en của lesson_vocabulary)
        const fillInBlankSentences = selected
            .map((item) => {
                const word = item?.vocabulary?.word;
                const sentenceEn = item?.sentence_en;
                const answer = word ? [word] : [];

                if (word && sentenceEn) {
                    const blankSentence = sentenceEn.replace(
                        new RegExp(`\\b${escapeRegExp(word)}\\b`, "gi"),
                        "[BLANK]",
                    );
                    return { sentence: blankSentence, answers: answer };
                }

                return {
                    sentence: "I like to eat [BLANK] every day.",
                    answers: answer,
                };
            })
            .filter((s) => s.answers?.length);

        if (fillInBlankSentences.length > 0) {
            const fib = await this.exerciseService.createFillInBlankExercise(
                user,
                lessonId,
                fillInBlankSentences,
            );
            created.push(fib?._id);
        }

        // 3) Pronunciation
        const pronunciationItems = selected
            .map((item) => {
                const word = item?.vocabulary?.word;
                const phonetic =
                    item?.vocabulary?.phonetic ||
                    item?.vocabulary?.definition_vi ||
                    item?.vocabulary?.definition_en ||
                    "";
                if (!word) return null;
                return { word, phonetic };
            })
            .filter((x) => x && x.phonetic);

        if (pronunciationItems.length > 0) {
            const pronunciation =
                await this.exerciseService.createPronunciationExercise(
                    user,
                    lessonId,
                    pronunciationItems as any,
                );
            created.push(pronunciation?._id);
        }

        return {
            created_exercise_ids: created.filter(Boolean),
            selected_vocab_ids: selectedVocabIds,
        };
    }
}
