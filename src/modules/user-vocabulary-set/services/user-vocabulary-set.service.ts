import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserVocabularySet } from "../entities/user-vocabulary-set.entity";
import { UserVocabularySetRepository } from "../repository/user-vocabulary-set-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserVocabularySetService extends BaseService<
    UserVocabularySet,
    UserVocabularySetRepository
> {
    constructor(
        @InjectRepository(Entity.USER_VOCABULARY_SET)
        private readonly userVocabularySetRepository: UserVocabularySetRepository,
    ) {
        super(userVocabularySetRepository, {
            notFoundCode: "error-user-vocabulary-set-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserVocabularySet>,
    ): Promise<UserVocabularySet[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserVocabularySet>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
