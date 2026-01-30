import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserVocabularyStat } from "../entities/user-vocabulary-stat.entity";
import { UserVocabularyStatRepository } from "../repository/user-vocabulary-stat-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserVocabularyStatService extends BaseService<
    UserVocabularyStat,
    UserVocabularyStatRepository
> {
    constructor(
        @InjectRepository(Entity.USER_VOCABULARY_STAT)
        private readonly userVocabularyStatRepository: UserVocabularyStatRepository,
    ) {
        super(userVocabularyStatRepository, {
            notFoundCode: "error-user-vocabulary-stat-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserVocabularyStat>,
    ): Promise<UserVocabularyStat[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserVocabularyStat>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
