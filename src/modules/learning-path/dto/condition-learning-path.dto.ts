import { PartialType } from "@nestjs/mapped-types";
import { LearningPath } from "../entities/learning-path.entity";

export class ConditionLearningPathDto extends PartialType(LearningPath) {}
