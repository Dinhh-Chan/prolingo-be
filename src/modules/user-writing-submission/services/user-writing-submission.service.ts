import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserWritingSubmission } from "../entities/user-writing-submission.entity";
import { UserWritingSubmissionRepository } from "../repository/user-writing-submission-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserWritingSubmissionService extends BaseService<
    UserWritingSubmission,
    UserWritingSubmissionRepository
> {
    constructor(
        @InjectRepository(Entity.USER_WRITING_SUBMISSION)
        private readonly userWritingSubmissionRepository: UserWritingSubmissionRepository,
    ) {
        super(userWritingSubmissionRepository, {
            notFoundCode: "error-user-writing-submission-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserWritingSubmission>,
    ): Promise<UserWritingSubmission[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserWritingSubmission>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
