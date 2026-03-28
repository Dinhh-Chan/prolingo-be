import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { UserModule } from "../user/user.module";
import { VocabSpeakingContentController } from "./controller/vocab-speaking-content.controller";
import { VocabSpeakingContentModel } from "./models/vocab-speaking-content.model";
import { VocabSpeakingContentRepositorySql } from "./repository/vocab-speaking-content-repository.sql";
import { VocabSpeakingContentService } from "./services/vocab-speaking-content.service";

@Module({
    imports: [
        SequelizeModule.forFeature([VocabSpeakingContentModel]),
        UserModule,
    ],
    controllers: [VocabSpeakingContentController],
    providers: [
        VocabSpeakingContentService,
        RepositoryProvider(
            Entity.VOCAB_SPEAKING_CONTENT,
            VocabSpeakingContentRepositorySql,
        ),
    ],
    exports: [VocabSpeakingContentService],
})
export class VocabSpeakingContentModule {}
