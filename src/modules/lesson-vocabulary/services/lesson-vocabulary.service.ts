import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
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
    ) {
        super(lessonVocabularyRepository, {
            notFoundCode: "error-lesson-vocabulary-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<LessonVocabulary>,
    ): Promise<LessonVocabulary[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<LessonVocabulary>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
