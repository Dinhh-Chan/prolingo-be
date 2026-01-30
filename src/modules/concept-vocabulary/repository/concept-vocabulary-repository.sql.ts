import { InjectModel } from "@nestjs/sequelize";
import { ConceptVocabularyModel } from "../models/concept-vocabulary.model";
import { ConceptVocabulary } from "../entities/concept-vocabulary.entity";
import { ConceptVocabularyRepository } from "./concept-vocabulary-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ConceptVocabularyRepositorySql
    extends SqlRepository<ConceptVocabulary>
    implements ConceptVocabularyRepository
{
    constructor(
        @InjectModel(ConceptVocabularyModel)
        private readonly conceptVocabularyModel: typeof ConceptVocabularyModel,
    ) {
        super(conceptVocabularyModel);
    }
}
