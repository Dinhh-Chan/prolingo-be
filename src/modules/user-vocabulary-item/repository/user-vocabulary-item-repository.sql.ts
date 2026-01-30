import { InjectModel } from "@nestjs/sequelize";
import { UserVocabularyItemModel } from "../models/user-vocabulary-item.model";
import { UserVocabularyItem } from "../entities/user-vocabulary-item.entity";
import { UserVocabularyItemRepository } from "./user-vocabulary-item-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserVocabularyItemRepositorySql
    extends SqlRepository<UserVocabularyItem>
    implements UserVocabularyItemRepository
{
    constructor(
        @InjectModel(UserVocabularyItemModel)
        private readonly userVocabularyItemModel: typeof UserVocabularyItemModel,
    ) {
        super(userVocabularyItemModel);
    }
}
