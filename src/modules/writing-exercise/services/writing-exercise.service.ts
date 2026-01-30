import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { WritingExercise } from "../entities/writing-exercise.entity";
import { WritingExerciseRepository } from "../repository/writing-exercise-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class WritingExerciseService extends BaseService<
    WritingExercise,
    WritingExerciseRepository
> {
    constructor(
        @InjectRepository(Entity.WRITING_EXERCISE)
        private readonly writingExerciseRepository: WritingExerciseRepository,
    ) {
        super(writingExerciseRepository, {
            notFoundCode: "error-writing-exercise-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<WritingExercise>,
    ): Promise<WritingExercise[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<WritingExercise>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
