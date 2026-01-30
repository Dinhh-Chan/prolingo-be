import { PartialType } from "@nestjs/mapped-types";
import { LearningModule } from "../entities/learning-module.entity";

export class ConditionLearningModuleDto extends PartialType(LearningModule) {}
