import { PartialType } from "@nestjs/mapped-types";
import { WritingExercise } from "../entities/writing-exercise.entity";

export class ConditionWritingExerciseDto extends PartialType(WritingExercise) {}
