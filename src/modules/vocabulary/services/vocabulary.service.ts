import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { Vocabulary } from "../entities/vocabulary.entity";
import { VocabularyRepository } from "../repository/vocabulary-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class VocabularyService extends BaseService<
    Vocabulary,
    VocabularyRepository
> {
    constructor(
        @InjectRepository(Entity.VOCABULARY)
        private readonly vocabularyRepository: VocabularyRepository,
    ) {
        super(vocabularyRepository, {
            notFoundCode: "error-vocabulary-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<Vocabulary>,
    ): Promise<Vocabulary[]> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { word: 1 },
        };

        return super.getMany(user, conditions, queryWithDefaultSort);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<Vocabulary>,
    ): Promise<any> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { word: 1 },
        };
        return super.getPage(user, conditions, queryWithDefaultSort);
    }
}
