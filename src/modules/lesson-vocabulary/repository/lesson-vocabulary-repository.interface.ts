import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { LessonVocabulary } from "../entities/lesson-vocabulary.entity";

export interface LessonVocabularyRepository
    extends BaseRepository<LessonVocabulary> {}
