import { PartialType } from "@nestjs/mapped-types";
import { Exercise } from "../entities/exercise.entity";

export class ConditionExerciseDto extends PartialType(Exercise) {}
