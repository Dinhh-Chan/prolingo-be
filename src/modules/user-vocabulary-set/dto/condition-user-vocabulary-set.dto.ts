import { PartialType } from "@nestjs/mapped-types";
import { UserVocabularySet } from "../entities/user-vocabulary-set.entity";

export class ConditionUserVocabularySetDto extends PartialType(
    UserVocabularySet,
) {}
