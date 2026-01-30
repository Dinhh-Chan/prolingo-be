import { PartialType } from "@nestjs/mapped-types";
import { CreateSpeakingDialogueDto } from "./create-speaking-dialogue.dto";

export class UpdateSpeakingDialogueDto extends PartialType(
    CreateSpeakingDialogueDto,
) {}
