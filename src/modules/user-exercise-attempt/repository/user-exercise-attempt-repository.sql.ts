import { InjectModel } from "@nestjs/sequelize";
import { UserExerciseAttemptModel } from "../models/user-exercise-attempt.model";
import { UserExerciseAttempt } from "../entities/user-exercise-attempt.entity";
import { UserExerciseAttemptRepository } from "./user-exercise-attempt-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserExerciseAttemptRepositorySql
    extends SqlRepository<UserExerciseAttempt>
    implements UserExerciseAttemptRepository
{
    constructor(
        @InjectModel(UserExerciseAttemptModel)
        private readonly userExerciseAttemptModel: typeof UserExerciseAttemptModel,
    ) {
        super(userExerciseAttemptModel);
    }
}
