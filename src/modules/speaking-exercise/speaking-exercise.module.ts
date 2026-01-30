import { SpeakingExerciseController } from "./controller/speaking-exercise.controller";
import { SpeakingExerciseService } from "./services/speaking-exercise.service";
import { SpeakingExerciseModel } from "./models/speaking-exercise.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { SpeakingExerciseRepositorySql } from "./repository/speaking-exercise-repository.sql";
import { SpeakingScenarioModule } from "../speaking-scenario/speaking-scenario.module";

@Module({
    imports: [
        SequelizeModule.forFeature([SpeakingExerciseModel]),
        SpeakingScenarioModule,
    ],
    controllers: [SpeakingExerciseController],
    providers: [
        SpeakingExerciseService,
        RepositoryProvider(
            Entity.SPEAKING_EXERCISE,
            SpeakingExerciseRepositorySql,
        ),
    ],
    exports: [SpeakingExerciseService],
})
export class SpeakingExerciseModule {}
