import { PartialType } from "@nestjs/mapped-types";
import { CreateUserVocabularyItemDto } from "./create-user-vocabulary-item.dto";

export class UpdateUserVocabularyItemDto extends PartialType(
    CreateUserVocabularyItemDto,
) {}
