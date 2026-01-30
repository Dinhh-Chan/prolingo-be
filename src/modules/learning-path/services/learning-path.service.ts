import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { LearningPath } from "../entities/learning-path.entity";
import { LearningPathRepository } from "../repository/learning-path-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class LearningPathService extends BaseService<
    LearningPath,
    LearningPathRepository
> {
    constructor(
        @InjectRepository(Entity.LEARNING_PATH)
        private readonly learningPathRepository: LearningPathRepository,
    ) {
        super(learningPathRepository, {
            notFoundCode: "error-learning-path-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<LearningPath>,
    ): Promise<LearningPath[]> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name_vi: 1 },
        };
        return super.getMany(user, conditions, queryWithDefaultSort);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<LearningPath>,
    ): Promise<any> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name_vi: 1 },
        };
        return super.getPage(user, conditions, queryWithDefaultSort);
    }
}
