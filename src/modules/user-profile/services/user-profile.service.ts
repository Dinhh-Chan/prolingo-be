import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserProfile } from "../entities/user-profile.entity";
import { UserProfileRepository } from "../repository/user-profile-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserProfileService extends BaseService<
    UserProfile,
    UserProfileRepository
> {
    constructor(
        @InjectRepository(Entity.USER_PROFILE)
        private readonly userProfileRepository: UserProfileRepository,
    ) {
        super(userProfileRepository, {
            notFoundCode: "error-user-profile-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserProfile>,
    ): Promise<UserProfile[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserProfile>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
