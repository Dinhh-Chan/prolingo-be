import { InjectModel } from "@nestjs/sequelize";
import { UserWritingSubmissionModel } from "../models/user-writing-submission.model";
import { UserWritingSubmission } from "../entities/user-writing-submission.entity";
import { UserWritingSubmissionRepository } from "./user-writing-submission-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserWritingSubmissionRepositorySql
    extends SqlRepository<UserWritingSubmission>
    implements UserWritingSubmissionRepository
{
    constructor(
        @InjectModel(UserWritingSubmissionModel)
        private readonly userWritingSubmissionModel: typeof UserWritingSubmissionModel,
    ) {
        super(userWritingSubmissionModel);
    }
}
