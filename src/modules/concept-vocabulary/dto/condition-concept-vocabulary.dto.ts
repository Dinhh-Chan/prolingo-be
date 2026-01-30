import { PartialType } from "@nestjs/mapped-types";
import { ConceptVocabulary } from "../entities/concept-vocabulary.entity";

export class ConditionConceptVocabularyDto extends PartialType(
    ConceptVocabulary,
) {}
