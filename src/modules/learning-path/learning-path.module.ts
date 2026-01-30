import { LearningPathController } from "./controller/learning-path.controller";
import { LearningPathService } from "./services/learning-path.service";
import { LearningPathModel } from "./models/learning-path.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { LearningPathRepositorySql } from "./repository/learning-path-repository.sql";
import { IndustryModule } from "../industry/industry.module";
import { CertificationModule } from "../certification/certification.module";

@Module({
    imports: [
        SequelizeModule.forFeature([LearningPathModel]),
        IndustryModule,
        CertificationModule,
    ],
    controllers: [LearningPathController],
    providers: [
        LearningPathService,
        RepositoryProvider(Entity.LEARNING_PATH, LearningPathRepositorySql),
    ],
    exports: [LearningPathService],
})
export class LearningPathModule {}
