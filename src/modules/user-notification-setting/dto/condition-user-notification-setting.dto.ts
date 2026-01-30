import { PartialType } from "@nestjs/mapped-types";
import { UserNotificationSetting } from "../entities/user-notification-setting.entity";

export class ConditionUserNotificationSettingDto extends PartialType(
    UserNotificationSetting,
) {}
