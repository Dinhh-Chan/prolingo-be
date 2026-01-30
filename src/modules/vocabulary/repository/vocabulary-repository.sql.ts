import { InjectModel } from "@nestjs/sequelize";
import { VocabularyModel } from "../models/vocabulary.model";
import { Vocabulary } from "../entities/vocabulary.entity";
import { VocabularyRepository } from "./vocabulary-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class VocabularyRepositorySql
    extends SqlRepository<Vocabulary>
    implements VocabularyRepository
{
    constructor(
        @InjectModel(VocabularyModel)
        private readonly vocabularyModel: typeof VocabularyModel,
    ) {
        super(vocabularyModel);
    }
}
