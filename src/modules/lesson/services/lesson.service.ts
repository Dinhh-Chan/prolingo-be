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
import { UserVocabularyProgressService } from "@module/user-vocabulary-progress/services/user-vocabulary-progress.service";
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
        private readonly userVocabularyProgressService: UserVocabularyProgressService,
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

        const vocabIds = links.map((l) => l.vocab_id).filter(Boolean);
        const flashMap =
            await this.userVocabularyProgressService.getFlashcardStateMap(
                user,
                vocabIds,
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
            const flash = flashMap.get(link.vocab_id);
            vocabulary.push({
                order_index: link.order_index,
                lesson_vocabulary_id: link._id,
                audio_url: vocab.audio_url,
                phonetic: vocab.phonetic,
                sentence_en: firstSentence?.sentence_en,
                sentence_vi: firstSentence?.sentence_vi,
                sentence_audio_url: firstSentence?.audio_url,
                flashcard_remembered_count:
                    flash?.flashcard_remembered_count ?? 0,
                is_remembered: flash?.is_remembered ?? false,
                level: flash?.level ?? 1,
                wrong_count: flash?.wrong_count ?? 0,
                interval_days: flash?.interval_days ?? 1,
                next_review_at: flash?.next_review ?? null,
                is_weak: flash?.is_weak ?? false,
                weak_correct_streak: flash?.weak_correct_streak ?? 0,
                quiz_type: UserVocabularyProgressService.quizTypeByLevel(
                    flash?.level ?? 1,
                ),
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
