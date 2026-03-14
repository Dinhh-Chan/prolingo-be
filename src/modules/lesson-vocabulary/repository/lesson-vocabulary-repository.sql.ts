import { InjectModel } from "@nestjs/sequelize";
import { LessonVocabularyModel } from "../models/lesson-vocabulary.model";
import { LessonVocabulary } from "../entities/lesson-vocabulary.entity";
import { LessonVocabularyRepository } from "./lesson-vocabulary-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class LessonVocabularyRepositorySql
    extends SqlRepository<LessonVocabulary>
    implements LessonVocabularyRepository
{
    constructor(
        @InjectModel(LessonVocabularyModel)
        private readonly lessonVocabularyModel: typeof LessonVocabularyModel,
    ) {
        super(lessonVocabularyModel);
    }
}
