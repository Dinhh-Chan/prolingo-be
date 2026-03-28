import { PartialType } from "@nestjs/mapped-types";
import { VocabSpeakingContent } from "../entities/vocab-speaking-content.entity";

export class ConditionVocabSpeakingContentDto extends PartialType(
    VocabSpeakingContent,
) {}
