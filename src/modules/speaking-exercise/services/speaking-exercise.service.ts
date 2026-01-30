import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { SpeakingExercise } from "../entities/speaking-exercise.entity";
import { SpeakingExerciseRepository } from "../repository/speaking-exercise-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class SpeakingExerciseService extends BaseService<
    SpeakingExercise,
    SpeakingExerciseRepository
> {
    constructor(
        @InjectRepository(Entity.SPEAKING_EXERCISE)
        private readonly speakingExerciseRepository: SpeakingExerciseRepository,
    ) {
        super(speakingExerciseRepository, {
            notFoundCode: "error-speaking-exercise-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<SpeakingExercise>,
    ): Promise<SpeakingExercise[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<SpeakingExercise>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
