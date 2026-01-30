import { PartialType } from "@nestjs/mapped-types";
import { SpeakingExercise } from "../entities/speaking-exercise.entity";

export class ConditionSpeakingExerciseDto extends PartialType(
    SpeakingExercise,
) {}
