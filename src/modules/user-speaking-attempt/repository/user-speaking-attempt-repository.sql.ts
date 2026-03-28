import { InjectModel } from "@nestjs/sequelize";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { UserSpeakingAttempt } from "../entities/user-speaking-attempt.entity";
import { UserSpeakingAttemptModel } from "../models/user-speaking-attempt.model";
import { UserSpeakingAttemptRepository } from "./user-speaking-attempt-repository.interface";

export class UserSpeakingAttemptRepositorySql
    extends SqlRepository<UserSpeakingAttempt>
    implements UserSpeakingAttemptRepository
{
    constructor(
        @InjectModel(UserSpeakingAttemptModel)
        private readonly userSpeakingAttemptModel: typeof UserSpeakingAttemptModel,
    ) {
        super(userSpeakingAttemptModel);
    }
}
