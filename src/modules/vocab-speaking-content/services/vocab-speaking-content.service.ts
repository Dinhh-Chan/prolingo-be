import { GetManyQuery, GetPageQuery } from "@common/constant";
import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { User } from "@module/user/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { VocabSpeakingContent } from "../entities/vocab-speaking-content.entity";
import { VocabSpeakingContentRepository } from "../repository/vocab-speaking-content-repository.interface";

@Injectable()
export class VocabSpeakingContentService extends BaseService<
    VocabSpeakingContent,
    VocabSpeakingContentRepository
> {
    constructor(
        @InjectRepository(Entity.VOCAB_SPEAKING_CONTENT)
        private readonly vocabSpeakingContentRepository: VocabSpeakingContentRepository,
    ) {
        super(vocabSpeakingContentRepository, {
            notFoundCode: "error-vocab-speaking-content-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<VocabSpeakingContent>,
    ): Promise<VocabSpeakingContent[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<VocabSpeakingContent>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
