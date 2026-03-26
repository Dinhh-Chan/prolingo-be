import { UserExerciseAttemptController } from "./controller/user-exercise-attempt.controller";
import { UserExerciseAttemptService } from "./services/user-exercise-attempt.service";
import { UserExerciseAttemptModel } from "./models/user-exercise-attempt.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserExerciseAttemptRepositorySql } from "./repository/user-exercise-attempt-repository.sql";
import { UserModule } from "../user/user.module";
import { ExerciseModule } from "../exercise/exercise.module";
import { LessonModule } from "../lesson/lesson.module";
import { LessonVocabularyModule } from "../lesson-vocabulary/lesson-vocabulary.module";
import { UserVocabularyProgressModule } from "../user-vocabulary-progress/user-vocabulary-progress.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UserExerciseAttemptModel]),
        UserModule,
        ExerciseModule,
        LessonModule,
        LessonVocabularyModule,
        UserVocabularyProgressModule,
    ],
    controllers: [UserExerciseAttemptController],
    providers: [
        UserExerciseAttemptService,
        RepositoryProvider(
            Entity.USER_EXERCISE_ATTEMPT,
            UserExerciseAttemptRepositorySql,
        ),
    ],
    exports: [UserExerciseAttemptService],
})
export class UserExerciseAttemptModule {}
