import { UserVocabularyProgressController } from "./controller/user-vocabulary-progress.controller";
import { UserVocabularyProgressService } from "./services/user-vocabulary-progress.service";
import { UserVocabularyProgressModel } from "./models/user-vocabulary-progress.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserVocabularyProgressRepositorySql } from "./repository/user-vocabulary-progress-repository.sql";
import { UserModule } from "../user/user.module";
import { VocabularyModule } from "../vocabulary/vocabulary.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UserVocabularyProgressModel]),
        UserModule,
        VocabularyModule,
    ],
    controllers: [UserVocabularyProgressController],
    providers: [
        UserVocabularyProgressService,
        RepositoryProvider(
            Entity.USER_VOCABULARY_PROGRESS,
            UserVocabularyProgressRepositorySql,
        ),
    ],
    exports: [UserVocabularyProgressService],
})
export class UserVocabularyProgressModule {}
