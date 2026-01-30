import { UserVocabularyItemController } from "./controller/user-vocabulary-item.controller";
import { UserVocabularyItemService } from "./services/user-vocabulary-item.service";
import { UserVocabularyItemModel } from "./models/user-vocabulary-item.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserVocabularyItemRepositorySql } from "./repository/user-vocabulary-item-repository.sql";
import { UserVocabularySetModule } from "../user-vocabulary-set/user-vocabulary-set.module";
import { VocabularyModule } from "../vocabulary/vocabulary.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UserVocabularyItemModel]),
        UserVocabularySetModule,
        VocabularyModule,
    ],
    controllers: [UserVocabularyItemController],
    providers: [
        UserVocabularyItemService,
        RepositoryProvider(
            Entity.USER_VOCABULARY_ITEM,
            UserVocabularyItemRepositorySql,
        ),
    ],
    exports: [UserVocabularyItemService],
})
export class UserVocabularyItemModule {}
