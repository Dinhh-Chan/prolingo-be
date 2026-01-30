import { PartialType } from "@nestjs/mapped-types";
import { UserProgress } from "../entities/user-progress.entity";

export class ConditionUserProgressDto extends PartialType(UserProgress) {}
