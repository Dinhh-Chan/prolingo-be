import { PartialType } from "@nestjs/mapped-types";
import { UserDailyActivity } from "../entities/user-daily-activity.entity";

export class ConditionUserDailyActivityDto extends PartialType(
    UserDailyActivity,
) {}
