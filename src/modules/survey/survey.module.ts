import { Module } from "@nestjs/common";
import { SurveyController } from "./controller/survey.controller";
import { SurveyService } from "./services/survey.service";
import { OpenAILearningPathService } from "./services/openai-learning-path.service";
import { UserProfileModule } from "@module/user-profile/user-profile.module";
import { UserNotificationSettingModule } from "@module/user-notification-setting/user-notification-setting.module";
import { LearningPathModule } from "@module/learning-path/learning-path.module";
import { LearningModuleModule } from "@module/learning-module/learning-module.module";
import { LessonModule } from "@module/lesson/lesson.module";
import { VocabularyModule } from "@module/vocabulary/vocabulary.module";
import { ExampleSentenceModule } from "@module/example-sentence/example-sentence.module";
import { LessonVocabularyModule } from "@module/lesson-vocabulary/lesson-vocabulary.module";

@Module({
    imports: [
        UserProfileModule,
        UserNotificationSettingModule,
        LearningPathModule,
        LearningModuleModule,
        LessonModule,
        VocabularyModule,
        ExampleSentenceModule,
        LessonVocabularyModule,
    ],
    controllers: [SurveyController],
    providers: [SurveyService, OpenAILearningPathService],
    exports: [SurveyService],
})
export class SurveyModule {}
