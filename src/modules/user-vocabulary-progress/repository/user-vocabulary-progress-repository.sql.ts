import { InjectModel } from "@nestjs/sequelize";
import { UserVocabularyProgressModel } from "../models/user-vocabulary-progress.model";
import { UserVocabularyProgress } from "../entities/user-vocabulary-progress.entity";
import { UserVocabularyProgressRepository } from "./user-vocabulary-progress-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserVocabularyProgressRepositorySql
    extends SqlRepository<UserVocabularyProgress>
    implements UserVocabularyProgressRepository
{
    constructor(
        @InjectModel(UserVocabularyProgressModel)
        private readonly userVocabularyProgressModel: typeof UserVocabularyProgressModel,
    ) {
        super(userVocabularyProgressModel);
    }
}
