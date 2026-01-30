import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { SpeakingDialogueService } from "../services/speaking-dialogue.service";
import { SpeakingDialogue } from "../entities/speaking-dialogue.entity";
import { CreateSpeakingDialogueDto } from "../dto/create-speaking-dialogue.dto";
import { UpdateSpeakingDialogueDto } from "../dto/update-speaking-dialogue.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionSpeakingDialogueDto } from "../dto/condition-speaking-dialogue.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("speaking-dialogues")
@ApiTags("SpeakingDialogue")
export class SpeakingDialogueController extends BaseControllerFactory<SpeakingDialogue>(
    SpeakingDialogue,
    ConditionSpeakingDialogueDto,
    CreateSpeakingDialogueDto,
    UpdateSpeakingDialogueDto,
    {
        authorize: true,
        routes: {
            getMany: {
                enable: false,
            },
            getById: {
                roles: [SystemRole.ADMIN],
            },
        },
    },
) {
    constructor(
        private readonly speakingDialogueService: SpeakingDialogueService,
    ) {
        super(speakingDialogueService);
    }
}
