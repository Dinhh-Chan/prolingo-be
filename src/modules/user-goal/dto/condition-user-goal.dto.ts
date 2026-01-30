import { PartialType } from "@nestjs/mapped-types";
import { UserGoal } from "../entities/user-goal.entity";

export class ConditionUserGoalDto extends PartialType(UserGoal) {}
