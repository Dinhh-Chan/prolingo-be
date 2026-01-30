import { ExerciseIndustryController } from "./controller/exercise-industry.controller";
import { ExerciseIndustryService } from "./services/exercise-industry.service";
import { ExerciseIndustryModel } from "./models/exercise-industry.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ExerciseIndustryRepositorySql } from "./repository/exercise-industry-repository.sql";
import { ExerciseModule } from "../exercise/exercise.module";
import { IndustryModule } from "../industry/industry.module";

@Module({
    imports: [
        SequelizeModule.forFeature([ExerciseIndustryModel]),
        ExerciseModule,
        IndustryModule,
    ],
    controllers: [ExerciseIndustryController],
    providers: [
        ExerciseIndustryService,
        RepositoryProvider(
            Entity.EXERCISE_INDUSTRY,
            ExerciseIndustryRepositorySql,
        ),
    ],
    exports: [ExerciseIndustryService],
})
export class ExerciseIndustryModule {}
