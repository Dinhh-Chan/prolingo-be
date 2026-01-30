import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ExerciseType } from "../entities/exercise-type.entity";
import { ExerciseTypeRepository } from "../repository/exercise-type-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ExerciseTypeService extends BaseService<
    ExerciseType,
    ExerciseTypeRepository
> {
    constructor(
        @InjectRepository(Entity.EXERCISE_TYPE)
        private readonly exerciseTypeRepository: ExerciseTypeRepository,
    ) {
        super(exerciseTypeRepository, {
            notFoundCode: "error-exercise-type-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<ExerciseType>,
    ): Promise<ExerciseType[]> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name_vi: 1 },
        };

        return super.getMany(user, conditions, queryWithDefaultSort);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<ExerciseType>,
    ): Promise<any> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name_vi: 1 },
        };
        return super.getPage(user, conditions, queryWithDefaultSort);
    }
}
