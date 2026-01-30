import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { SpeakingDialogue } from "../entities/speaking-dialogue.entity";

export interface SpeakingDialogueRepository
    extends BaseRepository<SpeakingDialogue> {}
