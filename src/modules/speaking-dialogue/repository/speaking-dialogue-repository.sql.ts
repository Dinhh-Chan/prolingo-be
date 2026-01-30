import { InjectModel } from "@nestjs/sequelize";
import { SpeakingDialogueModel } from "../models/speaking-dialogue.model";
import { SpeakingDialogue } from "../entities/speaking-dialogue.entity";
import { SpeakingDialogueRepository } from "./speaking-dialogue-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class SpeakingDialogueRepositorySql
    extends SqlRepository<SpeakingDialogue>
    implements SpeakingDialogueRepository
{
    constructor(
        @InjectModel(SpeakingDialogueModel)
        private readonly speakingDialogueModel: typeof SpeakingDialogueModel,
    ) {
        super(speakingDialogueModel);
    }
}
