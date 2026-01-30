import { InjectModel } from "@nestjs/sequelize";
import { UserGoalModel } from "../models/user-goal.model";
import { UserGoal } from "../entities/user-goal.entity";
import { UserGoalRepository } from "./user-goal-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserGoalRepositorySql
    extends SqlRepository<UserGoal>
    implements UserGoalRepository
{
    constructor(
        @InjectModel(UserGoalModel)
        private readonly userGoalModel: typeof UserGoalModel,
    ) {
        super(userGoalModel);
    }
}
