import { ExerciseTypeController } from "./controller/exercise-type.controller";
import { ExerciseTypeService } from "./services/exercise-type.service";
import { ExerciseTypeModel } from "./models/exercise-type.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ExerciseTypeRepositorySql } from "./repository/exercise-type-repository.sql";

@Module({
    imports: [SequelizeModule.forFeature([ExerciseTypeModel])],
    controllers: [ExerciseTypeController],
    providers: [
        ExerciseTypeService,
        RepositoryProvider(Entity.EXERCISE_TYPE, ExerciseTypeRepositorySql),
    ],
    exports: [ExerciseTypeService],
})
export class ExerciseTypeModule {}
