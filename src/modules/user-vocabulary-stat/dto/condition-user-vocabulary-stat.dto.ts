import { PartialType } from "@nestjs/mapped-types";
import { UserVocabularyStat } from "../entities/user-vocabulary-stat.entity";

export class ConditionUserVocabularyStatDto extends PartialType(
    UserVocabularyStat,
) {}
