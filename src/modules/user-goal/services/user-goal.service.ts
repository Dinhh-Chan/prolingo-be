import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserGoal } from "../entities/user-goal.entity";
import { UserGoalRepository } from "../repository/user-goal-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserGoalService extends BaseService<UserGoal, UserGoalRepository> {
    constructor(
        @InjectRepository(Entity.USER_GOAL)
        private readonly userGoalRepository: UserGoalRepository,
    ) {
        super(userGoalRepository, {
            notFoundCode: "error-user-goal-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserGoal>,
    ): Promise<UserGoal[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserGoal>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
