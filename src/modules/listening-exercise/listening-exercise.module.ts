import { ListeningExerciseController } from "./controller/listening-exercise.controller";
import { ListeningExerciseService } from "./services/listening-exercise.service";
import { ListeningExerciseModel } from "./models/listening-exercise.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ListeningExerciseRepositorySql } from "./repository/listening-exercise-repository.sql";
import { ListeningContentModule } from "../listening-content/listening-content.module";

@Module({
    imports: [
        SequelizeModule.forFeature([ListeningExerciseModel]),
        ListeningContentModule,
    ],
    controllers: [ListeningExerciseController],
    providers: [
        ListeningExerciseService,
        RepositoryProvider(
            Entity.LISTENING_EXERCISE,
            ListeningExerciseRepositorySql,
        ),
    ],
    exports: [ListeningExerciseService],
})
export class ListeningExerciseModule {}
