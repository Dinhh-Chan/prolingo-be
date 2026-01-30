import { ReadingExerciseController } from "./controller/reading-exercise.controller";
import { ReadingExerciseService } from "./services/reading-exercise.service";
import { ReadingExerciseModel } from "./models/reading-exercise.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ReadingExerciseRepositorySql } from "./repository/reading-exercise-repository.sql";
import { ReadingContentModule } from "../reading-content/reading-content.module";

@Module({
    imports: [
        SequelizeModule.forFeature([ReadingExerciseModel]),
        ReadingContentModule,
    ],
    controllers: [ReadingExerciseController],
    providers: [
        ReadingExerciseService,
        RepositoryProvider(
            Entity.READING_EXERCISE,
            ReadingExerciseRepositorySql,
        ),
    ],
    exports: [ReadingExerciseService],
})
export class ReadingExerciseModule {}
