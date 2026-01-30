import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDailyActivityDto } from "./create-user-daily-activity.dto";

export class UpdateUserDailyActivityDto extends PartialType(
    CreateUserDailyActivityDto,
) {}
