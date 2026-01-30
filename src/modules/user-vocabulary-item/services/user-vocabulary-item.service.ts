import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserVocabularyItem } from "../entities/user-vocabulary-item.entity";
import { UserVocabularyItemRepository } from "../repository/user-vocabulary-item-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserVocabularyItemService extends BaseService<
    UserVocabularyItem,
    UserVocabularyItemRepository
> {
    constructor(
        @InjectRepository(Entity.USER_VOCABULARY_ITEM)
        private readonly userVocabularyItemRepository: UserVocabularyItemRepository,
    ) {
        super(userVocabularyItemRepository, {
            notFoundCode: "error-user-vocabulary-item-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserVocabularyItem>,
    ): Promise<UserVocabularyItem[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserVocabularyItem>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
