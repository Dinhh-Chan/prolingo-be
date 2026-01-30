import { ConceptVocabularyController } from "./controller/concept-vocabulary.controller";
import { ConceptVocabularyService } from "./services/concept-vocabulary.service";
import { ConceptVocabularyModel } from "./models/concept-vocabulary.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConceptVocabularyRepositorySql } from "./repository/concept-vocabulary-repository.sql";
import { ConceptModule } from "../concept/concept.module";
import { VocabularyModule } from "../vocabulary/vocabulary.module";

@Module({
    imports: [
        SequelizeModule.forFeature([ConceptVocabularyModel]),
        ConceptModule,
        VocabularyModule,
    ],
    controllers: [ConceptVocabularyController],
    providers: [
        ConceptVocabularyService,
        RepositoryProvider(
            Entity.CONCEPT_VOCABULARY,
            ConceptVocabularyRepositorySql,
        ),
    ],
    exports: [ConceptVocabularyService],
})
export class ConceptVocabularyModule {}
