import { PartialType } from "@nestjs/mapped-types";
import { UserExerciseAttempt } from "../entities/user-exercise-attempt.entity";

export class ConditionUserExerciseAttemptDto extends PartialType(
    UserExerciseAttempt,
) {}
