import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { SpeakingScenarioService } from "../services/speaking-scenario.service";
import { SpeakingScenario } from "../entities/speaking-scenario.entity";
import { CreateSpeakingScenarioDto } from "../dto/create-speaking-scenario.dto";
import { UpdateSpeakingScenarioDto } from "../dto/update-speaking-scenario.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionSpeakingScenarioDto } from "../dto/condition-speaking-scenario.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("speaking-scenarios")
@ApiTags("SpeakingScenario")
export class SpeakingScenarioController extends BaseControllerFactory<SpeakingScenario>(
    SpeakingScenario,
    ConditionSpeakingScenarioDto,
    CreateSpeakingScenarioDto,
    UpdateSpeakingScenarioDto,
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
        private readonly speakingScenarioService: SpeakingScenarioService,
    ) {
        super(speakingScenarioService);
    }
}
