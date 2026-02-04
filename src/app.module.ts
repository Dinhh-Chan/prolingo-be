import { DefaultModules, DefaultProviders } from "@config/module/config";
import { AuditLogModule } from "@module/audit-log/audit-log.module";
import { IncrementModule } from "@module/increment/increment.module";
import { RedisModule } from "@module/redis/redis.module";
import { SsoModule } from "@module/sso/sso.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { CommonProviderModule } from "./modules/common-provider/common-provider.module";
import { DataPartitionModule } from "./modules/data-partition/data-partition.module";
import { DataProcessModule } from "./modules/data-process/data-process.module";
import { EventAccountModule } from "./modules/event-account/event-account.module";
import { FileModule } from "./modules/file/file.module";
import { ImportSessionModule } from "./modules/import-session/import-session.module";
import { OneSignalModule } from "./modules/one-signal/one-signal.module";
import { QuyTacMaModule } from "./modules/quy-tac-ma/quy-tac-ma.module";
import { SettingModule } from "./modules/setting/setting.module";
import { TopicModule } from "./modules/topic/topic.module";
import { UserModule } from "./modules/user/user.module";
import { EventModule } from "./modules/event/event.module";
import { EventLogModule } from "./modules/event-log/event-log.module";
import { WebSocketModule } from "./modules/websocket/websocket.module";
import { IndustryModule } from "./modules/industry/industry.module";
import { JobRoleModule } from "./modules/job-role/job-role.module";
import { CertificationModule } from "./modules/certification/certification.module";
import { UserProfileModule } from "./modules/user-profile/user-profile.module";
import { UserGoalModule } from "./modules/user-goal/user-goal.module";
import { PlacementTestModule } from "./modules/placement-test/placement-test.module";
import { ConceptModule } from "./modules/concept/concept.module";
import { VocabularyModule } from "./modules/vocabulary/vocabulary.module";
import { ConceptIndustryModule } from "./modules/concept-industry/concept-industry.module";
import { ConceptCertificationModule } from "./modules/concept-certification/concept-certification.module";
import { ConceptVocabularyModule } from "./modules/concept-vocabulary/concept-vocabulary.module";
import { ExampleSentenceModule } from "./modules/example-sentence/example-sentence.module";
import { UserVocabularySetModule } from "./modules/user-vocabulary-set/user-vocabulary-set.module";
import { UserVocabularyItemModule } from "./modules/user-vocabulary-item/user-vocabulary-item.module";
import { UserVocabularyProgressModule } from "./modules/user-vocabulary-progress/user-vocabulary-progress.module";
import { ExerciseTypeModule } from "./modules/exercise-type/exercise-type.module";
import { ExerciseModule } from "./modules/exercise/exercise.module";
import { ExerciseIndustryModule } from "./modules/exercise-industry/exercise-industry.module";
import { ListeningContentModule } from "./modules/listening-content/listening-content.module";
import { ListeningExerciseModule } from "./modules/listening-exercise/listening-exercise.module";
import { ReadingContentModule } from "./modules/reading-content/reading-content.module";
import { ReadingExerciseModule } from "./modules/reading-exercise/reading-exercise.module";
import { WritingTemplateModule } from "./modules/writing-template/writing-template.module";
import { WritingExerciseModule } from "./modules/writing-exercise/writing-exercise.module";
import { UserWritingSubmissionModule } from "./modules/user-writing-submission/user-writing-submission.module";
import { SpeakingScenarioModule } from "./modules/speaking-scenario/speaking-scenario.module";
import { SpeakingDialogueModule } from "./modules/speaking-dialogue/speaking-dialogue.module";
import { SpeakingExerciseModule } from "./modules/speaking-exercise/speaking-exercise.module";
import { UserSpeakingSubmissionModule } from "./modules/user-speaking-submission/user-speaking-submission.module";
import { UserNotificationSettingModule } from "./modules/user-notification-setting/user-notification-setting.module";
import { NotificationUserModule } from "./modules/notification/notification.module";
import { LearningPathModule } from "./modules/learning-path/learning-path.module";
import { LearningModuleModule } from "./modules/learning-module/learning-module.module";
import { LessonModule } from "./modules/lesson/lesson.module";
import { LessonExerciseModule } from "./modules/lesson-exercise/lesson-exercise.module";
import { UserProgressModule } from "./modules/user-progress/user-progress.module";
import { UserExerciseAttemptModule } from "./modules/user-exercise-attempt/user-exercise-attempt.module";
import { UserVocabularyStatModule } from "./modules/user-vocabulary-stat/user-vocabulary-stat.module";
import { UserSkillStatModule } from "./modules/user-skill-stat/user-skill-stat.module";
import { UserDailyActivityModule } from "./modules/user-daily-activity/user-daily-activity.module";
import { UserStreakModule } from "./modules/user-streak/user-streak.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
    imports: [
        ...DefaultModules,
        AuthModule,
        UserModule,
        EventAccountModule,
        OneSignalModule,
        NotificationUserModule,
        TopicModule,
        FileModule,
        SettingModule,
        RedisModule,
        SsoModule,
        IncrementModule,
        ImportSessionModule,
        QuyTacMaModule,
        AuditLogModule,
        DataProcessModule,
        DataPartitionModule,
        CommonProviderModule,
        EventModule,
        EventLogModule,
        WebSocketModule,
        IndustryModule,
        JobRoleModule,
        CertificationModule,
        UserProfileModule,
        UserGoalModule,
        PlacementTestModule,
        ConceptModule,
        VocabularyModule,
        ConceptIndustryModule,
        ConceptCertificationModule,
        ConceptVocabularyModule,
        ExampleSentenceModule,
        UserVocabularySetModule,
        UserVocabularyItemModule,
        UserVocabularyProgressModule,
        ExerciseTypeModule,
        ExerciseModule,
        ExerciseIndustryModule,
        ListeningContentModule,
        ListeningExerciseModule,
        ReadingContentModule,
        ReadingExerciseModule,
        WritingTemplateModule,
        WritingExerciseModule,
        UserWritingSubmissionModule,
        SpeakingScenarioModule,
        SpeakingDialogueModule,
        SpeakingExerciseModule,
        UserSpeakingSubmissionModule,
        UserNotificationSettingModule,
        NotificationUserModule,
        LearningPathModule,
        LearningModuleModule,
        LessonModule,
        LessonExerciseModule,
        UserProgressModule,
        UserExerciseAttemptModule,
        UserVocabularyStatModule,
        UserSkillStatModule,
        UserDailyActivityModule,
        UserStreakModule,
        UsersModule,
    ],
    providers: [...DefaultProviders],
    controllers: [AppController],
})
export class AppModule {}
