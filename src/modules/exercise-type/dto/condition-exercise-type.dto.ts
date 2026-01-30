import { PartialType } from "@nestjs/mapped-types";
import { ExerciseType } from "../entities/exercise-type.entity";

export class ConditionExerciseTypeDto extends PartialType(ExerciseType) {}
