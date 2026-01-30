import { ListeningContentController } from "./controller/listening-content.controller";
import { ListeningContentService } from "./services/listening-content.service";
import { ListeningContentModel } from "./models/listening-content.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ListeningContentRepositorySql } from "./repository/listening-content-repository.sql";
import { IndustryModule } from "../industry/industry.module";

@Module({
    imports: [
        SequelizeModule.forFeature([ListeningContentModel]),
        IndustryModule,
    ],
    controllers: [ListeningContentController],
    providers: [
        ListeningContentService,
        RepositoryProvider(
            Entity.LISTENING_CONTENT,
            ListeningContentRepositorySql,
        ),
    ],
    exports: [ListeningContentService],
})
export class ListeningContentModule {}
