import { PartialType } from "@nestjs/mapped-types";
import { UserVocabularyItem } from "../entities/user-vocabulary-item.entity";

export class ConditionUserVocabularyItemDto extends PartialType(
    UserVocabularyItem,
) {}
