import { LearningModuleController } from "./controller/learning-module.controller";
import { LearningModuleService } from "./services/learning-module.service";
import { LearningModuleModel } from "./models/learning-module.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { LearningModuleRepositorySql } from "./repository/learning-module-repository.sql";
import { LearningPathModule } from "../learning-path/learning-path.module";

@Module({
    imports: [
        SequelizeModule.forFeature([LearningModuleModel]),
        LearningPathModule,
    ],
    controllers: [LearningModuleController],
    providers: [
        LearningModuleService,
        RepositoryProvider(Entity.LEARNING_MODULE, LearningModuleRepositorySql),
    ],
    exports: [LearningModuleService],
})
export class LearningModuleModule {}
