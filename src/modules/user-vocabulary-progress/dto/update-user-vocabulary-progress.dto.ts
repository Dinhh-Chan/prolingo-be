import { PartialType } from "@nestjs/mapped-types";
import { CreateUserVocabularyProgressDto } from "./create-user-vocabulary-progress.dto";

export class UpdateUserVocabularyProgressDto extends PartialType(
    CreateUserVocabularyProgressDto,
) {}
