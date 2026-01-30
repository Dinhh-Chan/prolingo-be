import { PartialType } from "@nestjs/mapped-types";
import { LessonExercise } from "../entities/lesson-exercise.entity";

export class ConditionLessonExerciseDto extends PartialType(LessonExercise) {}
