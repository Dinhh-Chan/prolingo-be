import { ConceptController } from "./controller/concept.controller";
import { ConceptService } from "./services/concept.service";
import { ConceptModel } from "./models/concept.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConceptRepositorySql } from "./repository/concept-repository.sql";

@Module({
    imports: [SequelizeModule.forFeature([ConceptModel])],
    controllers: [ConceptController],
    providers: [
        ConceptService,
        RepositoryProvider(Entity.CONCEPT, ConceptRepositorySql),
    ],
    exports: [ConceptService],
})
export class ConceptModule {}
