import { LessonVocabularyController } from "./controller/lesson-vocabulary.controller";
import { LessonVocabularyService } from "./services/lesson-vocabulary.service";
import { LessonVocabularyModel } from "./models/lesson-vocabulary.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { LessonVocabularyRepositorySql } from "./repository/lesson-vocabulary-repository.sql";
import { VocabularyModule } from "../vocabulary/vocabulary.module";
import { ExampleSentenceModule } from "../example-sentence/example-sentence.module";
import { UserVocabularyProgressModule } from "../user-vocabulary-progress/user-vocabulary-progress.module";

@Module({
    imports: [
        SequelizeModule.forFeature([LessonVocabularyModel]),
        VocabularyModule,
        ExampleSentenceModule,
        UserVocabularyProgressModule,
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
