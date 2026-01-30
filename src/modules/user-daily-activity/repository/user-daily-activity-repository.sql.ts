import { InjectModel } from "@nestjs/sequelize";
import { UserDailyActivityModel } from "../models/user-daily-activity.model";
import { UserDailyActivity } from "../entities/user-daily-activity.entity";
import { UserDailyActivityRepository } from "./user-daily-activity-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserDailyActivityRepositorySql
    extends SqlRepository<UserDailyActivity>
    implements UserDailyActivityRepository
{
    constructor(
        @InjectModel(UserDailyActivityModel)
        private readonly userDailyActivityModel: typeof UserDailyActivityModel,
    ) {
        super(userDailyActivityModel);
    }
}
