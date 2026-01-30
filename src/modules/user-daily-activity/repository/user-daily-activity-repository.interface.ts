import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserDailyActivity } from "../entities/user-daily-activity.entity";

export interface UserDailyActivityRepository
    extends BaseRepository<UserDailyActivity> {}
