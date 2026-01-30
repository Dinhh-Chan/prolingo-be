import { PartialType } from "@nestjs/mapped-types";
import { UserSkillStat } from "../entities/user-skill-stat.entity";

export class ConditionUserSkillStatDto extends PartialType(UserSkillStat) {}
