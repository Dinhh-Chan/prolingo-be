import { PartialType } from "@nestjs/mapped-types";
import { LessonVocabulary } from "../entities/lesson-vocabulary.entity";

export class ConditionLessonVocabularyDto extends PartialType(
    LessonVocabulary,
) {}
