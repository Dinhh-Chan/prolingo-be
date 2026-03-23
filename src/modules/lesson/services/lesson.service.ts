import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { Lesson } from "../entities/lesson.entity";
import { LessonRepository } from "../repository/lesson-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetByIdQuery, GetManyQuery, GetPageQuery } from "@common/constant";
import { BaseQueryOption } from "@module/repository/common/base-repository.interface";
import { LessonVocabularyService } from "@module/lesson-vocabulary/services/lesson-vocabulary.service";
import { VocabularyService } from "@module/vocabulary/services/vocabulary.service";
import { ExampleSentenceService } from "@module/example-sentence/services/example-sentence.service";
import {
    LessonVocabularyItem,
    LessonWithVocabulary,
} from "../types/lesson-with-vocabulary.types";

@Injectable()
export class LessonService extends BaseService<Lesson, LessonRepository> {
    constructor(
        @InjectRepository(Entity.LESSON)
        private readonly lessonRepository: LessonRepository,
        private readonly lessonVocabularyService: LessonVocabularyService,
        private readonly vocabularyService: VocabularyService,
        private readonly exampleSentenceService: ExampleSentenceService,
    ) {
        super(lessonRepository, {
            notFoundCode: "error-lesson-not-found",
        });
    }

    /**
     * Chi tiết lesson kèm từ vựng + câu ví dụ (theo lesson_vocabulary → vocabulary, example_sentences).
     */
    async getById(
        user: User,
        id: string,
        query?: GetByIdQuery<Lesson> & BaseQueryOption<unknown>,
    ): Promise<LessonWithVocabulary> {
        const lesson = await super.getById(user, id, query);
        const links = await this.lessonVocabularyService.getMany(
            user,
            { lesson_id: id } as any,
            {
                sort: { order_index: 1 },
                enableDataPartition: false,
            } as any,
        );

        const vocabulary: LessonVocabularyItem[] = [];
        for (const link of links) {
            const vocab = await this.vocabularyService.getById(
                user,
                link.vocab_id,
                { enableDataPartition: false } as any,
            );
            if (!vocab) {
                continue;
            }
            const example_sentences = await this.exampleSentenceService.getMany(
                user,
                { vocab_id: link.vocab_id } as any,
                {
                    sort: { _id: -1 },
                    enableDataPartition: false,
                } as any,
            );
            const firstSentence = example_sentences[0];
            vocabulary.push({
                order_index: link.order_index,
                lesson_vocabulary_id: link._id,
                audio_url: vocab.audio_url,
                sentence_en: firstSentence?.sentence_en,
                sentence_vi: firstSentence?.sentence_vi,
                sentence_audio_url: firstSentence?.audio_url,
                example_audio_urls: example_sentences
                    .map((item) => item.audio_url)
                    .filter((url): url is string => Boolean(url)),
                vocabulary: vocab,
                example_sentences,
            });
        }

        return Object.assign(lesson, { vocabulary }) as LessonWithVocabulary;
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<Lesson>,
    ): Promise<Lesson[]> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { order_index: 1 },
        };
        return super.getMany(user, conditions, queryWithDefaultSort);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<Lesson>,
    ): Promise<any> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { order_index: 1 },
        };
        return super.getPage(user, conditions, queryWithDefaultSort);
    }
}
