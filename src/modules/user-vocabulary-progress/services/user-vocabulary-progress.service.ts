import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserVocabularyProgress } from "../entities/user-vocabulary-progress.entity";
import { UserVocabularyProgressRepository } from "../repository/user-vocabulary-progress-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserVocabularyProgressService extends BaseService<
    UserVocabularyProgress,
    UserVocabularyProgressRepository
> {
    constructor(
        @InjectRepository(Entity.USER_VOCABULARY_PROGRESS)
        private readonly userVocabularyProgressRepository: UserVocabularyProgressRepository,
    ) {
        super(userVocabularyProgressRepository, {
            notFoundCode: "error-user-vocabulary-progress-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserVocabularyProgress>,
    ): Promise<UserVocabularyProgress[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserVocabularyProgress>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
