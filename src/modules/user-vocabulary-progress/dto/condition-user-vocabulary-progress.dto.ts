import { PartialType } from "@nestjs/mapped-types";
import { UserVocabularyProgress } from "../entities/user-vocabulary-progress.entity";

export class ConditionUserVocabularyProgressDto extends PartialType(
    UserVocabularyProgress,
) {}
