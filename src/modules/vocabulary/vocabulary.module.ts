import { VocabularyController } from "./controller/vocabulary.controller";
import { VocabularyService } from "./services/vocabulary.service";
import { VocabularyModel } from "./models/vocabulary.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { VocabularyRepositorySql } from "./repository/vocabulary-repository.sql";

@Module({
    imports: [SequelizeModule.forFeature([VocabularyModel])],
    controllers: [VocabularyController],
    providers: [
        VocabularyService,
        RepositoryProvider(Entity.VOCABULARY, VocabularyRepositorySql),
    ],
    exports: [VocabularyService],
})
export class VocabularyModule {}
