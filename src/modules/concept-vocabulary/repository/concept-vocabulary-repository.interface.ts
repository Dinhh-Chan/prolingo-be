import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { ConceptVocabulary } from "../entities/concept-vocabulary.entity";

export interface ConceptVocabularyRepository
    extends BaseRepository<ConceptVocabulary> {}
