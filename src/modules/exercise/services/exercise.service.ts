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
}
