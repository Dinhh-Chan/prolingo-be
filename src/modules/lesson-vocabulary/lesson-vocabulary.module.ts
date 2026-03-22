import { LessonVocabularyController } from "./controller/lesson-vocabulary.controller";
import { LessonVocabularyService } from "./services/lesson-vocabulary.service";
import { LessonVocabularyModel } from "./models/lesson-vocabulary.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { LessonVocabularyRepositorySql } from "./repository/lesson-vocabulary-repository.sql";
import { VocabularyModule } from "../vocabulary/vocabulary.module";

@Module({
    imports: [
        SequelizeModule.forFeature([LessonVocabularyModel]),
        VocabularyModule,
    ],
    controllers: [LessonVocabularyController],
    providers: [
        LessonVocabularyService,
        RepositoryProvider(
            Entity.LESSON_VOCABULARY,
            LessonVocabularyRepositorySql,
        ),
    ],
    exports: [LessonVocabularyService],
})
export class LessonVocabularyModule {}
