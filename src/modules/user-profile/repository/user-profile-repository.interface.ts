import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserProfile } from "../entities/user-profile.entity";

export interface UserProfileRepository extends BaseRepository<UserProfile> {}
