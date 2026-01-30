import { ReadingContentController } from "./controller/reading-content.controller";
import { ReadingContentService } from "./services/reading-content.service";
import { ReadingContentModel } from "./models/reading-content.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ReadingContentRepositorySql } from "./repository/reading-content-repository.sql";
import { IndustryModule } from "../industry/industry.module";

@Module({
    imports: [
        SequelizeModule.forFeature([ReadingContentModel]),
        IndustryModule,
    ],
    controllers: [ReadingContentController],
    providers: [
        ReadingContentService,
        RepositoryProvider(Entity.READING_CONTENT, ReadingContentRepositorySql),
    ],
    exports: [ReadingContentService],
})
export class ReadingContentModule {}
