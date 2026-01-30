import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserWritingSubmission } from "../entities/user-writing-submission.entity";

export interface UserWritingSubmissionRepository
    extends BaseRepository<UserWritingSubmission> {}
