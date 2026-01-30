import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ConceptVocabulary } from "../entities/concept-vocabulary.entity";
import { ConceptVocabularyRepository } from "../repository/concept-vocabulary-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ConceptVocabularyService extends BaseService<
    ConceptVocabulary,
    ConceptVocabularyRepository
> {
    constructor(
        @InjectRepository(Entity.CONCEPT_VOCABULARY)
        private readonly conceptVocabularyRepository: ConceptVocabularyRepository,
    ) {
        super(conceptVocabularyRepository, {
            notFoundCode: "error-concept-vocabulary-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<ConceptVocabulary>,
    ): Promise<ConceptVocabulary[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<ConceptVocabulary>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
