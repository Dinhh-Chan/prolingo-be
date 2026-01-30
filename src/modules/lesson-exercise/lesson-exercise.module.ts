import { LessonExerciseController } from "./controller/lesson-exercise.controller";
import { LessonExerciseService } from "./services/lesson-exercise.service";
import { LessonExerciseModel } from "./models/lesson-exercise.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { LessonExerciseRepositorySql } from "./repository/lesson-exercise-repository.sql";
import { LessonModule } from "../lesson/lesson.module";
import { ExerciseModule } from "../exercise/exercise.module";

@Module({
    imports: [
        SequelizeModule.forFeature([LessonExerciseModel]),
        LessonModule,
        ExerciseModule,
    ],
    controllers: [LessonExerciseController],
    providers: [
        LessonExerciseService,
        RepositoryProvider(Entity.LESSON_EXERCISE, LessonExerciseRepositorySql),
    ],
    exports: [LessonExerciseService],
})
export class LessonExerciseModule {}
