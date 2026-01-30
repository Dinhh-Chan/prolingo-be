import { InjectModel } from "@nestjs/sequelize";
import { UserSpeakingSubmissionModel } from "../models/user-speaking-submission.model";
import { UserSpeakingSubmission } from "../entities/user-speaking-submission.entity";
import { UserSpeakingSubmissionRepository } from "./user-speaking-submission-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserSpeakingSubmissionRepositorySql
    extends SqlRepository<UserSpeakingSubmission>
    implements UserSpeakingSubmissionRepository
{
    constructor(
        @InjectModel(UserSpeakingSubmissionModel)
        private readonly userSpeakingSubmissionModel: typeof UserSpeakingSubmissionModel,
    ) {
        super(userSpeakingSubmissionModel);
    }
}
