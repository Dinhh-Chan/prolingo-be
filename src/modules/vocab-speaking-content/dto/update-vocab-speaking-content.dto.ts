import { PartialType } from "@nestjs/mapped-types";
import { CreateVocabSpeakingContentDto } from "./create-vocab-speaking-content.dto";

export class UpdateVocabSpeakingContentDto extends PartialType(
    CreateVocabSpeakingContentDto,
) {}
