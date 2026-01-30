import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserSkillStat } from "../entities/user-skill-stat.entity";

export interface UserSkillStatRepository
    extends BaseRepository<UserSkillStat> {}
