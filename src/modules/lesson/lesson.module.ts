import { LessonController } from "./controller/lesson.controller";
import { LessonService } from "./services/lesson.service";
import { LessonModel } from "./models/lesson.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { LessonRepositorySql } from "./repository/lesson-repository.sql";
import { LearningModuleModule } from "../learning-module/learning-module.module";

@Module({
    imports: [SequelizeModule.forFeature([LessonModel]), LearningModuleModule],
    controllers: [LessonController],
    providers: [
        LessonService,
        RepositoryProvider(Entity.LESSON, LessonRepositorySql),
    ],
    exports: [LessonService],
})
export class LessonModule {}
