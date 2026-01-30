import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ReadingExercise } from "../entities/reading-exercise.entity";
import { ReadingExerciseRepository } from "../repository/reading-exercise-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ReadingExerciseService extends BaseService<
    ReadingExercise,
    ReadingExerciseRepository
> {
    constructor(
        @InjectRepository(Entity.READING_EXERCISE)
        private readonly readingExerciseRepository: ReadingExerciseRepository,
    ) {
        super(readingExerciseRepository, {
            notFoundCode: "error-reading-exercise-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<ReadingExercise>,
    ): Promise<ReadingExercise[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<ReadingExercise>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
