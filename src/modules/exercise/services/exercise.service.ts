import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { Exercise } from "../entities/exercise.entity";
import { ExerciseRepository } from "../repository/exercise-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";
import { ExerciseTypeService } from "@module/exercise-type/services/exercise-type.service";

@Injectable()
export class ExerciseService extends BaseService<Exercise, ExerciseRepository> {
    constructor(
        @InjectRepository(Entity.EXERCISE)
        private readonly exerciseRepository: ExerciseRepository,
        private readonly exerciseTypeService: ExerciseTypeService,
    ) {
        super(exerciseRepository, {
            notFoundCode: "error-exercise-not-found",
        });
    }

    private async getTypeIdByCode(user: User, code: string): Promise<string> {
        const exerciseType = await this.exerciseTypeService.getOne(
            user,
            { code } as any,
            { enableDataPartition: false } as any,
        );
        if (!exerciseType?._id) {
            // Nếu không có seed exercise_types theo code, thì không thể tạo exercise
            throw new Error(`Missing exercise type for code="${code}"`);
        }
        return exerciseType._id;
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<Exercise>,
    ): Promise<Exercise[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<Exercise>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }

    /**
     * Tạo bài tập matching (nối từ với nghĩa)
     * @param user User object
     * @param lessonId Lesson ID
     * @param vocabularies Danh sách vocabulary với id, word, definition_vi
     * @returns Exercise object với content chứa left/right matching data
     */
    async createMatchingExercise(
        user: User,
        lessonId: string,
        vocabularies: any[],
    ): Promise<Exercise> {
        const type_id = await this.getTypeIdByCode(user, "matching");
        // Tạo left side - danh sách từ vựng gốc
        const left = vocabularies.map((vocab) => ({
            id: vocab._id || vocab.id,
            text: vocab.word,
            question_type: "matching",
        }));

        // Tạo right side - danh sách định nghĩa (xáo trộn)
        const right = vocabularies.map((vocab) => ({
            id: vocab._id || vocab.id,
            text: vocab.definition_vi || vocab.definition_en || "",
            question_type: "matching",
        }));

        // Cặp đúng để FE có thể render dạng "mỗi câu matching"
        const pairs = vocabularies.map((vocab) => ({
            left_id: vocab._id || vocab.id,
            right_id: vocab._id || vocab.id,
            question_type: "matching",
        }));

        // Shuffle right side
        const shuffledRight = this.shuffleArray([...right]);

        const content = {
            left,
            right: shuffledRight,
            pairs,
        };

        const exercise = await super.create(user, {
            type: "matching",
            type_id,
            lesson_id: lessonId,
            content,
        } as Partial<Exercise>);

        return exercise;
    }

    /**
     * Shuffle array (Fisher-Yates algorithm)
     */
    private shuffleArray<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Tạo bài tập điền từ vào chỗ trống
     * @param user User object
     * @param lessonId Lesson ID
     * @param sentences Danh sách câu với chỗ trống [BLANK] và đáp án
     * @returns Exercise object với content chứa danh sách câu
     */
    async createFillInBlankExercise(
        user: User,
        lessonId: string,
        sentences: { sentence: string; answers: string[] }[],
    ): Promise<Exercise> {
        const type_id = await this.getTypeIdByCode(user, "fill_in_blank");
        const normalizedSentences = sentences.map((item) => ({
            ...item,
            question_type: "fill_in_blank",
        }));
        const content = {
            sentences: normalizedSentences,
        };

        const exercise = await super.create(user, {
            type: "fill_in_blank",
            type_id,
            lesson_id: lessonId,
            content,
        } as Partial<Exercise>);

        return exercise;
    }

    /**
     * Tạo bài tập phát âm (phát âm hiển thị bằng phonetic) -> chọn từ đúng
     * @param user User object
     * @param lessonId Lesson ID
     * @param items Danh sách từ với phonetic
     */
    async createPronunciationExercise(
        user: User,
        lessonId: string,
        items: { word: string; phonetic?: string }[],
    ): Promise<Exercise> {
        const type_id = await this.getTypeIdByCode(user, "pronunciation");
        const allWords = items.map((item) => item.word);

        const questions = items.map((item) => {
            const options = this.shuffleArray(
                Array.from(
                    new Set([
                        item.word,
                        ...allWords.filter((w) => w !== item.word),
                    ]),
                ),
            ).slice(0, 4);

            if (!options.includes(item.word)) {
                options[0] = item.word;
            }

            return {
                phonetic: item.phonetic || "",
                question: `Which word matches the pronunciation ${item.phonetic || "[?]"}?`,
                options: this.shuffleArray(options),
                correctAnswer: item.word,
                question_type: "pronunciation",
            };
        });

        const content = {
            questions,
        };

        const exercise = await super.create(user, {
            type: "pronunciation",
            type_id,
            lesson_id: lessonId,
            content,
        } as Partial<Exercise>);

        return exercise;
    }
}
