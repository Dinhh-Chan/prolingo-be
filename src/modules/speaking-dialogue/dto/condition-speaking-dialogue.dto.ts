import { PartialType } from "@nestjs/mapped-types";
import { SpeakingDialogue } from "../entities/speaking-dialogue.entity";

export class ConditionSpeakingDialogueDto extends PartialType(
    SpeakingDialogue,
) {}
