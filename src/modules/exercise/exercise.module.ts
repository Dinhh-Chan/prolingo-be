import { ExerciseController } from "./controller/exercise.controller";
import { ExerciseGenerationController } from "./controller/exercise-generation.controller";
import { ExerciseService } from "./services/exercise.service";
import { ExerciseGenerationService } from "./services/exercise-generation.service";
import { ExerciseModel } from "./models/exercise.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ExerciseRepositorySql } from "./repository/exercise-repository.sql";
import { ExerciseTypeModule } from "../exercise-type/exercise-type.module";
import { VocabularyModule } from "../vocabulary/vocabulary.module";
import { LessonVocabularyModule } from "../lesson-vocabulary/lesson-vocabulary.module";
import { LessonExerciseModule } from "../lesson-exercise/lesson-exercise.module";
import { UserSpeakingAttemptModule } from "../user-speaking-attempt/user-speaking-attempt.module";
import { UserVocabularyProgressModule } from "../user-vocabulary-progress/user-vocabulary-progress.module";
import { PronunciationAssessmentClient } from "./services/pronunciation-assessment.client";
import { ExerciseSpeakingService } from "./services/exercise-speaking.service";

@Module({
    imports: [
        SequelizeModule.forFeature([ExerciseModel]),
        ExerciseTypeModule,
        VocabularyModule,
        LessonVocabularyModule,
        LessonExerciseModule,
        UserSpeakingAttemptModule,
        UserVocabularyProgressModule,
    ],
    controllers: [ExerciseController, ExerciseGenerationController],
    providers: [
        ExerciseService,
        ExerciseGenerationService,
        PronunciationAssessmentClient,
        ExerciseSpeakingService,
        RepositoryProvider(Entity.EXERCISE, ExerciseRepositorySql),
    ],
    exports: [ExerciseService],
})
export class ExerciseModule {}
