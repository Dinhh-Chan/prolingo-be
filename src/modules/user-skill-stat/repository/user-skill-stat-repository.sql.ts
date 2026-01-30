import { InjectModel } from "@nestjs/sequelize";
import { UserSkillStatModel } from "../models/user-skill-stat.model";
import { UserSkillStat } from "../entities/user-skill-stat.entity";
import { UserSkillStatRepository } from "./user-skill-stat-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserSkillStatRepositorySql
    extends SqlRepository<UserSkillStat>
    implements UserSkillStatRepository
{
    constructor(
        @InjectModel(UserSkillStatModel)
        private readonly userSkillStatModel: typeof UserSkillStatModel,
    ) {
        super(userSkillStatModel);
    }
}
