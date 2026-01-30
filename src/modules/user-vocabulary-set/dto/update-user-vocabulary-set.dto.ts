import { PartialType } from "@nestjs/mapped-types";
import { CreateUserVocabularySetDto } from "./create-user-vocabulary-set.dto";

export class UpdateUserVocabularySetDto extends PartialType(
    CreateUserVocabularySetDto,
) {}
