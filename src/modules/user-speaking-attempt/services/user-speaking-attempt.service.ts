import { GetManyQuery, GetPageQuery } from "@common/constant";
import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { User } from "@module/user/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { UserSpeakingAttempt } from "../entities/user-speaking-attempt.entity";
import { UserSpeakingAttemptRepository } from "../repository/user-speaking-attempt-repository.interface";

@Injectable()
export class UserSpeakingAttemptService extends BaseService<
    UserSpeakingAttempt,
    UserSpeakingAttemptRepository
> {
    constructor(
        @InjectRepository(Entity.USER_SPEAKING_ATTEMPT)
        private readonly userSpeakingAttemptRepository: UserSpeakingAttemptRepository,
    ) {
        super(userSpeakingAttemptRepository, {
            notFoundCode: "error-user-speaking-attempt-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserSpeakingAttempt>,
    ): Promise<UserSpeakingAttempt[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserSpeakingAttempt>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
