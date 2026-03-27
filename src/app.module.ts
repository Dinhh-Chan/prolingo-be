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
import { FileModule } from "./modules/file/file.module";
import { ImportSessionModule } from "./modules/import-session/import-session.module";
import { OneSignalModule } from "./modules/one-signal/one-signal.module";
import { QuyTacMaModule } from "./modules/quy-tac-ma/quy-tac-ma.module";
import { SettingModule } from "./modules/setting/setting.module";
import { TopicModule } from "./modules/topic/topic.module";
import { UserModule } from "./modules/user/user.module";
import { CertificationModule } from "./modules/certification/certification.module";
import { PlacementTestModule } from "./modules/placement-test/placement-test.module";
import { VocabularyModule } from "./modules/vocabulary/vocabulary.module";
import { ExampleSentenceModule } from "./modules/example-sentence/example-sentence.module";
import { UserVocabularySetModule } from "./modules/user-vocabulary-set/user-vocabulary-set.module";
import { UserVocabularyItemModule } from "./modules/user-vocabulary-item/user-vocabulary-item.module";
import { UserVocabularyProgressModule } from "./modules/user-vocabulary-progress/user-vocabulary-progress.module";
import { ExerciseTypeModule } from "./modules/exercise-type/exercise-type.module";
import { ExerciseModule } from "./modules/exercise/exercise.module";
import { UserNotificationSettingModule } from "./modules/user-notification-setting/user-notification-setting.module";
import { NotificationUserModule } from "./modules/notification/notification.module";
import { LearningPathModule } from "./modules/learning-path/learning-path.module";
import { LearningModuleModule } from "./modules/learning-module/learning-module.module";
import { LessonModule } from "./modules/lesson/lesson.module";
import { LessonExerciseModule } from "./modules/lesson-exercise/lesson-exercise.module";
import { UserExerciseAttemptModule } from "./modules/user-exercise-attempt/user-exercise-attempt.module";
import { UserVocabularyStatModule } from "./modules/user-vocabulary-stat/user-vocabulary-stat.module";
import { UserDailyActivityModule } from "./modules/user-daily-activity/user-daily-activity.module";
import { UsersModule } from "./modules/users/users.module";
import { SurveyModule } from "./modules/survey/survey.module";
import { RoadmapModule } from "./modules/roadmap/roadmap.module";

@Module({
    imports: [
        ...DefaultModules,
        AuthModule,
        UserModule,
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
        CertificationModule,
        PlacementTestModule,
        VocabularyModule,
        ExampleSentenceModule,
        UserVocabularySetModule,
        UserVocabularyItemModule,
        UserVocabularyProgressModule,
        ExerciseTypeModule,
        ExerciseModule,
        UserNotificationSettingModule,
        NotificationUserModule,
        LearningPathModule,
        LearningModuleModule,
        LessonModule,
        LessonExerciseModule,
        UserExerciseAttemptModule,
        UserVocabularyStatModule,
        UserDailyActivityModule,
        UsersModule,
        SurveyModule,
        RoadmapModule,
    ],
    providers: [...DefaultProviders],
    controllers: [AppController],
})
export class AppModule {}
