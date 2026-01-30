import { InjectModel } from "@nestjs/sequelize";
import { UserVocabularyStatModel } from "../models/user-vocabulary-stat.model";
import { UserVocabularyStat } from "../entities/user-vocabulary-stat.entity";
import { UserVocabularyStatRepository } from "./user-vocabulary-stat-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class UserVocabularyStatRepositorySql
    extends SqlRepository<UserVocabularyStat>
    implements UserVocabularyStatRepository
{
    constructor(
        @InjectModel(UserVocabularyStatModel)
        private readonly userVocabularyStatModel: typeof UserVocabularyStatModel,
    ) {
        super(userVocabularyStatModel);
    }
}
