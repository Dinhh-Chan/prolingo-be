import { LessonController } from "./controller/lesson.controller";
import { LessonService } from "./services/lesson.service";
import { LessonModel } from "./models/lesson.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { LessonRepositorySql } from "./repository/lesson-repository.sql";
import { LearningModuleModule } from "../learning-module/learning-module.module";
import { LessonVocabularyModule } from "../lesson-vocabulary/lesson-vocabulary.module";
import { VocabularyModule } from "../vocabulary/vocabulary.module";
import { ExampleSentenceModule } from "../example-sentence/example-sentence.module";
import { UserVocabularyProgressModule } from "../user-vocabulary-progress/user-vocabulary-progress.module";

@Module({
    imports: [
        SequelizeModule.forFeature([LessonModel]),
        LearningModuleModule,
        LessonVocabularyModule,
        VocabularyModule,
        ExampleSentenceModule,
        UserVocabularyProgressModule,
    ],
    controllers: [LessonController],
    providers: [
        LessonService,
        RepositoryProvider(Entity.LESSON, LessonRepositorySql),
    ],
    exports: [LessonService],
})
export class LessonModule {}
