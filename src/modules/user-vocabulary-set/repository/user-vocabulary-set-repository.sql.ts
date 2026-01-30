import { InjectModel } from "@nestjs/sequelize";
import { UserVocabularySetModel } from "../models/user-vocabulary-set.model";
import { UserVocabularySet } from "../entities/user-vocabulary-set.entity";
import { UserVocabularySetRepository } from "./user-vocabulary-set-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserVocabularySetRepositorySql
    extends SqlRepository<UserVocabularySet>
    implements UserVocabularySetRepository
{
    constructor(
        @InjectModel(UserVocabularySetModel)
        private readonly userVocabularySetModel: typeof UserVocabularySetModel,
    ) {
        super(userVocabularySetModel);
    }
}
