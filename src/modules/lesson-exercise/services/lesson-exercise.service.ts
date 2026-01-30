import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { LessonExercise } from "../entities/lesson-exercise.entity";
import { LessonExerciseRepository } from "../repository/lesson-exercise-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class LessonExerciseService extends BaseService<
    LessonExercise,
    LessonExerciseRepository
> {
    constructor(
        @InjectRepository(Entity.LESSON_EXERCISE)
        private readonly lessonExerciseRepository: LessonExerciseRepository,
    ) {
        super(lessonExerciseRepository, {
            notFoundCode: "error-lesson-exercise-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<LessonExercise>,
    ): Promise<LessonExercise[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<LessonExercise>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
