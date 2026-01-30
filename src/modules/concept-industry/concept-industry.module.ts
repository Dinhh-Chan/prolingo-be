import { ConceptIndustryController } from "./controller/concept-industry.controller";
import { ConceptIndustryService } from "./services/concept-industry.service";
import { ConceptIndustryModel } from "./models/concept-industry.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConceptIndustryRepositorySql } from "./repository/concept-industry-repository.sql";
import { ConceptModule } from "../concept/concept.module";
import { IndustryModule } from "../industry/industry.module";

@Module({
    imports: [
        SequelizeModule.forFeature([ConceptIndustryModel]),
        ConceptModule,
        IndustryModule,
    ],
    controllers: [ConceptIndustryController],
    providers: [
        ConceptIndustryService,
        RepositoryProvider(
            Entity.CONCEPT_INDUSTRY,
            ConceptIndustryRepositorySql,
        ),
    ],
    exports: [ConceptIndustryService],
})
export class ConceptIndustryModule {}
