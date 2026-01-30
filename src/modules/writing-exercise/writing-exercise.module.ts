import { WritingExerciseController } from "./controller/writing-exercise.controller";
import { WritingExerciseService } from "./services/writing-exercise.service";
import { WritingExerciseModel } from "./models/writing-exercise.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { WritingExerciseRepositorySql } from "./repository/writing-exercise-repository.sql";
import { WritingTemplateModule } from "../writing-template/writing-template.module";

@Module({
    imports: [
        SequelizeModule.forFeature([WritingExerciseModel]),
        WritingTemplateModule,
    ],
    controllers: [WritingExerciseController],
    providers: [
        WritingExerciseService,
        RepositoryProvider(
            Entity.WRITING_EXERCISE,
            WritingExerciseRepositorySql,
        ),
    ],
    exports: [WritingExerciseService],
})
export class WritingExerciseModule {}
