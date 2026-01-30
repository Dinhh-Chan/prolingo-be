import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ListeningExercise } from "../entities/listening-exercise.entity";
import { ListeningExerciseRepository } from "../repository/listening-exercise-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ListeningExerciseService extends BaseService<
    ListeningExercise,
    ListeningExerciseRepository
> {
    constructor(
        @InjectRepository(Entity.LISTENING_EXERCISE)
        private readonly listeningExerciseRepository: ListeningExerciseRepository,
    ) {
        super(listeningExerciseRepository, {
            notFoundCode: "error-listening-exercise-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<ListeningExercise>,
    ): Promise<ListeningExercise[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<ListeningExercise>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
