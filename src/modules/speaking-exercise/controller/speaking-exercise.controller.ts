import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { SpeakingExerciseService } from "../services/speaking-exercise.service";
import { SpeakingExercise } from "../entities/speaking-exercise.entity";
import { CreateSpeakingExerciseDto } from "../dto/create-speaking-exercise.dto";
import { UpdateSpeakingExerciseDto } from "../dto/update-speaking-exercise.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionSpeakingExerciseDto } from "../dto/condition-speaking-exercise.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("speaking-exercises")
@ApiTags("SpeakingExercise")
export class SpeakingExerciseController extends BaseControllerFactory<SpeakingExercise>(
    SpeakingExercise,
    ConditionSpeakingExerciseDto,
    CreateSpeakingExerciseDto,
    UpdateSpeakingExerciseDto,
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
        private readonly speakingExerciseService: SpeakingExerciseService,
    ) {
        super(speakingExerciseService);
    }
}
