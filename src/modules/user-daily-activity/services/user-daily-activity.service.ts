import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserDailyActivity } from "../entities/user-daily-activity.entity";
import { UserDailyActivityRepository } from "../repository/user-daily-activity-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserDailyActivityService extends BaseService<
    UserDailyActivity,
    UserDailyActivityRepository
> {
    constructor(
        @InjectRepository(Entity.USER_DAILY_ACTIVITY)
        private readonly userDailyActivityRepository: UserDailyActivityRepository,
    ) {
        super(userDailyActivityRepository, {
            notFoundCode: "error-user-daily-activity-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserDailyActivity>,
    ): Promise<UserDailyActivity[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserDailyActivity>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
