import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserSpeakingAttempt } from "../entities/user-speaking-attempt.entity";

export interface UserSpeakingAttemptRepository
    extends BaseRepository<UserSpeakingAttempt> {}
