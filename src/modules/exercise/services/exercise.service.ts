import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { Exercise } from "../entities/exercise.entity";
import { ExerciseRepository } from "../repository/exercise-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ExerciseService extends BaseService<Exercise, ExerciseRepository> {
    constructor(
        @InjectRepository(Entity.EXERCISE)
        private readonly exerciseRepository: ExerciseRepository,
    ) {
        super(exerciseRepository, {
            notFoundCode: "error-exercise-not-found",
        });
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
        // Tạo left side - danh sách từ vựng gốc
        const left = vocabularies.map((vocab) => ({
            id: vocab._id || vocab.id,
            text: vocab.word,
        }));

        // Tạo right side - danh sách định nghĩa (xáo trộn)
        const right = vocabularies.map((vocab) => ({
            id: vocab._id || vocab.id,
            text: vocab.definition_vi || vocab.definition_en || "",
        }));

        // Shuffle right side
        const shuffledRight = this.shuffleArray([...right]);

        const content = {
            left,
            right: shuffledRight,
        };

        const exercise = await super.create(user, {
            type: "matching",
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
}
