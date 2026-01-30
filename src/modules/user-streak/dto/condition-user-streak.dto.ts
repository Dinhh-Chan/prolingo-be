import { PartialType } from "@nestjs/mapped-types";
import { UserStreak } from "../entities/user-streak.entity";

export class ConditionUserStreakDto extends PartialType(UserStreak) {}
