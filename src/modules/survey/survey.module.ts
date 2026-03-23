import { Module } from "@nestjs/common";
import { SurveyController } from "./controller/survey.controller";
import { SurveyService } from "./services/survey.service";
import { OpenAILearningPathService } from "./services/openai-learning-path.service";
import { UserNotificationSettingModule } from "@module/user-notification-setting/user-notification-setting.module";
import { LearningPathModule } from "@module/learning-path/learning-path.module";
import { LearningModuleModule } from "@module/learning-module/learning-module.module";
import { LessonModule } from "@module/lesson/lesson.module";
import { VocabularyModule } from "@module/vocabulary/vocabulary.module";
import { ExampleSentenceModule } from "@module/example-sentence/example-sentence.module";
import { LessonVocabularyModule } from "@module/lesson-vocabulary/lesson-vocabulary.module";
import { ExerciseModule } from "@module/exercise/exercise.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { SurveyModel } from "./models/survey.model";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SurveyRepositorySql } from "./repository/survey-repository.sql";

@Module({
    imports: [
        UserNotificationSettingModule,
        LearningPathModule,
        LearningModuleModule,
        LessonModule,
        VocabularyModule,
        ExampleSentenceModule,
        LessonVocabularyModule,
        ExerciseModule,
        SequelizeModule.forFeature([SurveyModel]),
    ],
    controllers: [SurveyController],
    providers: [
        SurveyService,
        OpenAILearningPathService,
        RepositoryProvider(Entity.SURVEY, SurveyRepositorySql),
    ],
    exports: [SurveyService],
})
export class SurveyModule {}
