import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserSpeakingSubmission } from "../entities/user-speaking-submission.entity";
import { UserSpeakingSubmissionRepository } from "../repository/user-speaking-submission-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserSpeakingSubmissionService extends BaseService<
    UserSpeakingSubmission,
    UserSpeakingSubmissionRepository
> {
    constructor(
        @InjectRepository(Entity.USER_SPEAKING_SUBMISSION)
        private readonly userSpeakingSubmissionRepository: UserSpeakingSubmissionRepository,
    ) {
        super(userSpeakingSubmissionRepository, {
            notFoundCode: "error-user-speaking-submission-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserSpeakingSubmission>,
    ): Promise<UserSpeakingSubmission[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserSpeakingSubmission>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
