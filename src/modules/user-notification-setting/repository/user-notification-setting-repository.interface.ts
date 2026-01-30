import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserNotificationSetting } from "../entities/user-notification-setting.entity";

export interface UserNotificationSettingRepository
    extends BaseRepository<UserNotificationSetting> {}
