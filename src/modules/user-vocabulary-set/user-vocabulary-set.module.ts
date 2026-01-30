import { UserVocabularySetController } from "./controller/user-vocabulary-set.controller";
import { UserVocabularySetService } from "./services/user-vocabulary-set.service";
import { UserVocabularySetModel } from "./models/user-vocabulary-set.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserVocabularySetRepositorySql } from "./repository/user-vocabulary-set-repository.sql";
import { UserModule } from "../user/user.module";

@Module({
    imports: [SequelizeModule.forFeature([UserVocabularySetModel]), UserModule],
    controllers: [UserVocabularySetController],
    providers: [
        UserVocabularySetService,
        RepositoryProvider(
            Entity.USER_VOCABULARY_SET,
            UserVocabularySetRepositorySql,
        ),
    ],
    exports: [UserVocabularySetService],
})
export class UserVocabularySetModule {}
