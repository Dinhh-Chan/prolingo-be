import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { LearningModule } from "../entities/learning-module.entity";
import { LearningModuleRepository } from "../repository/learning-module-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class LearningModuleService extends BaseService<
    LearningModule,
    LearningModuleRepository
> {
    constructor(
        @InjectRepository(Entity.LEARNING_MODULE)
        private readonly learningModuleRepository: LearningModuleRepository,
    ) {
        super(learningModuleRepository, {
            notFoundCode: "error-learning-module-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<LearningModule>,
    ): Promise<LearningModule[]> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { order_index: 1 },
        };
        return super.getMany(user, conditions, queryWithDefaultSort);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<LearningModule>,
    ): Promise<any> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { order_index: 1 },
        };
        return super.getPage(user, conditions, queryWithDefaultSort);
    }
}
