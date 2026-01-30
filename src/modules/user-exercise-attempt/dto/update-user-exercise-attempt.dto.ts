import { PartialType } from "@nestjs/mapped-types";
import { CreateUserExerciseAttemptDto } from "./create-user-exercise-attempt.dto";

export class UpdateUserExerciseAttemptDto extends PartialType(
    CreateUserExerciseAttemptDto,
) {}
