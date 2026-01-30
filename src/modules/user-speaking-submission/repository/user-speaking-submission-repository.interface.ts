import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserSpeakingSubmission } from "../entities/user-speaking-submission.entity";

export interface UserSpeakingSubmissionRepository
    extends BaseRepository<UserSpeakingSubmission> {}
