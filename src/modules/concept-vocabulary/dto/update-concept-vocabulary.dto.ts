import { PartialType } from "@nestjs/mapped-types";
import { CreateConceptVocabularyDto } from "./create-concept-vocabulary.dto";

export class UpdateConceptVocabularyDto extends PartialType(
    CreateConceptVocabularyDto,
) {}
