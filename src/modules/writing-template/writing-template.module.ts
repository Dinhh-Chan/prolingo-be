import { WritingTemplateController } from "./controller/writing-template.controller";
import { WritingTemplateService } from "./services/writing-template.service";
import { WritingTemplateModel } from "./models/writing-template.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { WritingTemplateRepositorySql } from "./repository/writing-template-repository.sql";
import { IndustryModule } from "../industry/industry.module";

@Module({
    imports: [
        SequelizeModule.forFeature([WritingTemplateModel]),
        IndustryModule,
    ],
    controllers: [WritingTemplateController],
    providers: [
        WritingTemplateService,
        RepositoryProvider(
            Entity.WRITING_TEMPLATE,
            WritingTemplateRepositorySql,
        ),
    ],
    exports: [WritingTemplateService],
})
export class WritingTemplateModule {}
