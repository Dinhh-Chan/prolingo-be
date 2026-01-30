import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ExerciseIndustry } from "../entities/exercise-industry.entity";
import { ExerciseIndustryRepository } from "../repository/exercise-industry-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ExerciseIndustryService extends BaseService<
    ExerciseIndustry,
    ExerciseIndustryRepository
> {
    constructor(
        @InjectRepository(Entity.EXERCISE_INDUSTRY)
        private readonly exerciseIndustryRepository: ExerciseIndustryRepository,
    ) {
        super(exerciseIndustryRepository, {
            notFoundCode: "error-exercise-industry-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<ExerciseIndustry>,
    ): Promise<ExerciseIndustry[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<ExerciseIndustry>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
