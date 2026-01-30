import { UserProgressController } from "./controller/user-progress.controller";
import { UserProgressService } from "./services/user-progress.service";
import { UserProgressModel } from "./models/user-progress.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserProgressRepositorySql } from "./repository/user-progress-repository.sql";
import { UserModule } from "../user/user.module";
import { LearningPathModule } from "../learning-path/learning-path.module";
import { LearningModuleModule } from "../learning-module/learning-module.module";
import { LessonModule } from "../lesson/lesson.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UserProgressModel]),
        UserModule,
        LearningPathModule,
        LearningModuleModule,
        LessonModule,
    ],
    controllers: [UserProgressController],
    providers: [
        UserProgressService,
        RepositoryProvider(Entity.USER_PROGRESS, UserProgressRepositorySql),
    ],
    exports: [UserProgressService],
})
export class UserProgressModule {}
