import { ExampleSentenceController } from "./controller/example-sentence.controller";
import { ExampleSentenceService } from "./services/example-sentence.service";
import { ExampleSentenceModel } from "./models/example-sentence.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ExampleSentenceRepositorySql } from "./repository/example-sentence-repository.sql";
import { VocabularyModule } from "../vocabulary/vocabulary.module";

@Module({
    imports: [
        SequelizeModule.forFeature([ExampleSentenceModel]),
        VocabularyModule,
    ],
    controllers: [ExampleSentenceController],
    providers: [
        ExampleSentenceService,
        RepositoryProvider(
            Entity.EXAMPLE_SENTENCE,
            ExampleSentenceRepositorySql,
        ),
    ],
    exports: [ExampleSentenceService],
})
export class ExampleSentenceModule {}
