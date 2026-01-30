import { InjectModel } from "@nestjs/sequelize";
import { UserProgressModel } from "../models/user-progress.model";
import { UserProgress } from "../entities/user-progress.entity";
import { UserProgressRepository } from "./user-progress-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserProgressRepositorySql
    extends SqlRepository<UserProgress>
    implements UserProgressRepository
{
    constructor(
        @InjectModel(UserProgressModel)
        private readonly userProgressModel: typeof UserProgressModel,
    ) {
        super(userProgressModel);
    }
}
