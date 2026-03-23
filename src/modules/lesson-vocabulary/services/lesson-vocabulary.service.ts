import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ExampleSentenceService } from "@module/example-sentence/services/example-sentence.service";
import { VocabularyService } from "@module/vocabulary/services/vocabulary.service";
import { LessonVocabulary } from "../entities/lesson-vocabulary.entity";
import { LessonVocabularyRepository } from "../repository/lesson-vocabulary-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class LessonVocabularyService extends BaseService<
    LessonVocabulary,
    LessonVocabularyRepository
> {
    constructor(
        @InjectRepository(Entity.LESSON_VOCABULARY)
        private readonly lessonVocabularyRepository: LessonVocabularyRepository,
        private readonly vocabularyService: VocabularyService,
        private readonly exampleSentenceService: ExampleSentenceService,
    ) {
        super(lessonVocabularyRepository, {
            notFoundCode: "error-lesson-vocabulary-not-found",
        });
    }

    private async enrichLessonVocabularyItem(
        user: User,
        item: LessonVocabulary,
    ) {
        const vocab = await this.vocabularyService.getById(
            user,
            item.vocab_id,
            { enableDataPartition: false } as any,
        );
        const exampleSentences = await this.exampleSentenceService.getMany(
            user,
            { vocab_id: item.vocab_id } as any,
            {
                sort: { _id: -1 },
                enableDataPartition: false,
            } as any,
        );
        const firstSentence = exampleSentences[0];

        return {
            ...item,
            vocabulary: vocab,
            example_sentences: exampleSentences,
            sentence_en: firstSentence?.sentence_en,
            sentence_vi: firstSentence?.sentence_vi,
            sentence_audio_url: firstSentence?.audio_url,
            vocab_audio_url: vocab?.audio_url,
        };
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<LessonVocabulary>,
    ): Promise<any[]> {
        const items = await super.getMany(user, conditions, query);
        return Promise.all(
            items.map((item) => this.enrichLessonVocabularyItem(user, item)),
        );
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<LessonVocabulary>,
    ): Promise<any> {
        const pageData = await super.getPage(user, conditions, query);
        const result = await Promise.all(
            (pageData?.result || []).map((item: LessonVocabulary) =>
                this.enrichLessonVocabularyItem(user, item),
            ),
        );
        return {
            ...pageData,
            result,
        };
    }
}
