import { InjectModel } from "@nestjs/sequelize";
import { UserProfileModel } from "../models/user-profile.model";
import { UserProfile } from "../entities/user-profile.entity";
import { UserProfileRepository } from "./user-profile-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserProfileRepositorySql
    extends SqlRepository<UserProfile>
    implements UserProfileRepository
{
    constructor(
        @InjectModel(UserProfileModel)
        private readonly userProfileModel: typeof UserProfileModel,
    ) {
        super(userProfileModel);
    }
}
