import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserStreak } from "../entities/user-streak.entity";
import { UserStreakRepository } from "../repository/user-streak-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserStreakService extends BaseService<
    UserStreak,
    UserStreakRepository
> {
    constructor(
        @InjectRepository(Entity.USER_STREAK)
        private readonly userStreakRepository: UserStreakRepository,
    ) {
        super(userStreakRepository, {
            notFoundCode: "error-user-streak-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserStreak>,
    ): Promise<UserStreak[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserStreak>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
