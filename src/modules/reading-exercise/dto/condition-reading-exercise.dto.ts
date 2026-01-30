import { PartialType } from "@nestjs/mapped-types";
import { ReadingExercise } from "../entities/reading-exercise.entity";

export class ConditionReadingExerciseDto extends PartialType(ReadingExercise) {}
