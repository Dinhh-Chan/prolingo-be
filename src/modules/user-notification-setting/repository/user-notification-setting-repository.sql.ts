import { InjectModel } from "@nestjs/sequelize";
import { UserNotificationSettingModel } from "../models/user-notification-setting.model";
import { UserNotificationSetting } from "../entities/user-notification-setting.entity";
import { UserNotificationSettingRepository } from "./user-notification-setting-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserNotificationSettingRepositorySql
    extends SqlRepository<UserNotificationSetting>
    implements UserNotificationSettingRepository
{
    constructor(
        @InjectModel(UserNotificationSettingModel)
        private readonly userNotificationSettingModel: typeof UserNotificationSettingModel,
    ) {
        super(userNotificationSettingModel);
    }
}
