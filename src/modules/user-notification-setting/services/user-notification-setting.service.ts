import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserNotificationSetting } from "../entities/user-notification-setting.entity";
import { UserNotificationSettingRepository } from "../repository/user-notification-setting-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserNotificationSettingService extends BaseService<
    UserNotificationSetting,
    UserNotificationSettingRepository
> {
    constructor(
        @InjectRepository(Entity.USER_NOTIFICATION_SETTING)
        private readonly userNotificationSettingRepository: UserNotificationSettingRepository,
    ) {
        super(userNotificationSettingRepository, {
            notFoundCode: "error-user-notification-setting-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserNotificationSetting>,
    ): Promise<UserNotificationSetting[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserNotificationSetting>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
