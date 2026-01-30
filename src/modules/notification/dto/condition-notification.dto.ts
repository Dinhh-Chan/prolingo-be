import { PartialType } from "@nestjs/mapped-types";
import { NotificationUser } from "../entities/notification.entity";

export class ConditionNotificationUserDto extends PartialType(
    NotificationUser,
) {}
