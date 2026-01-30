import { InjectModel } from "@nestjs/sequelize";
import { UserStreakModel } from "../models/user-streak.model";
import { UserStreak } from "../entities/user-streak.entity";
import { UserStreakRepository } from "./user-streak-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserStreakRepositorySql
    extends SqlRepository<UserStreak>
    implements UserStreakRepository
{
    constructor(
        @InjectModel(UserStreakModel)
        private readonly userStreakModel: typeof UserStreakModel,
    ) {
        super(userStreakModel);
    }
}
