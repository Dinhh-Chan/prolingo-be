import { ExerciseController } from "./controller/exercise.controller";
import { ExerciseService } from "./services/exercise.service";
import { ExerciseModel } from "./models/exercise.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ExerciseRepositorySql } from "./repository/exercise-repository.sql";
import { ExerciseTypeModule } from "../exercise-type/exercise-type.module";
import { ConceptModule } from "../concept/concept.module";
import { VocabularyModule } from "../vocabulary/vocabulary.module";

@Module({
    imports: [
        SequelizeModule.forFeature([ExerciseModel]),
        ExerciseTypeModule,
        ConceptModule,
        VocabularyModule,
    ],
    controllers: [ExerciseController],
    providers: [
        ExerciseService,
        RepositoryProvider(Entity.EXERCISE, ExerciseRepositorySql),
    ],
    exports: [ExerciseService],
})
export class ExerciseModule {}
