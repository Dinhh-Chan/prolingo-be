import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserExerciseAttempt } from "../entities/user-exercise-attempt.entity";

export interface UserExerciseAttemptRepository
    extends BaseRepository<UserExerciseAttempt> {}
