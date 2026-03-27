import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ExampleSentenceService } from "@module/example-sentence/services/example-sentence.service";
import { VocabularyService } from "@module/vocabulary/services/vocabulary.service";
import { UserVocabularyProgressService } from "@module/user-vocabulary-progress/services/user-vocabulary-progress.service";
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
        private readonly userVocabularyProgressService: UserVocabularyProgressService,
    ) {
        super(lessonVocabularyRepository, {
            notFoundCode: "error-lesson-vocabulary-not-found",
        });
    }

    private async enrichLessonVocabularyItem(
        user: User,
        item: LessonVocabulary,
        flashMap: Awaited<
            ReturnType<UserVocabularyProgressService["getFlashcardStateMap"]>
        >,
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
        const flash = flashMap.get(item.vocab_id);

        return {
            ...item,
            vocabulary: vocab,
            example_sentences: exampleSentences,
            sentence_en: firstSentence?.sentence_en,
            sentence_vi: firstSentence?.sentence_vi,
            sentence_audio_url: firstSentence?.audio_url,
            vocab_audio_url: vocab?.audio_url,
            phonetic: vocab?.phonetic,
            part_of_speech: vocab?.part_of_speech,
            flashcard_remembered_count: flash?.flashcard_remembered_count ?? 0,
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
        };
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<LessonVocabulary>,
    ): Promise<any[]> {
        const items = await super.getMany(user, conditions, query);
        const vocabIds = items.map((i) => i.vocab_id).filter(Boolean);
        const flashMap =
            await this.userVocabularyProgressService.getFlashcardStateMap(
                user,
                vocabIds,
            );
        return Promise.all(
            items.map((item) =>
                this.enrichLessonVocabularyItem(user, item, flashMap),
            ),
        );
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<LessonVocabulary>,
    ): Promise<any> {
        const pageData = await super.getPage(user, conditions, query);
        const raw = pageData?.result || [];
        const vocabIds = raw
            .map((i: LessonVocabulary) => i.vocab_id)
            .filter(Boolean);
        const flashMap =
            await this.userVocabularyProgressService.getFlashcardStateMap(
                user,
                vocabIds,
            );
        const result = await Promise.all(
            raw.map((item: LessonVocabulary) =>
                this.enrichLessonVocabularyItem(user, item, flashMap),
            ),
        );
        return {
            ...pageData,
            result,
        };
    }
}
