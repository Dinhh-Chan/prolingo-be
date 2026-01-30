import { PartialType } from "@nestjs/mapped-types";
import { Vocabulary } from "../entities/vocabulary.entity";

export class ConditionVocabularyDto extends PartialType(Vocabulary) {}
