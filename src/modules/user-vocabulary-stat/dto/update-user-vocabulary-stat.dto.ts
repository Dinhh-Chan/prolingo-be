import { PartialType } from "@nestjs/mapped-types";
import { CreateUserVocabularyStatDto } from "./create-user-vocabulary-stat.dto";

export class UpdateUserVocabularyStatDto extends PartialType(
    CreateUserVocabularyStatDto,
) {}
