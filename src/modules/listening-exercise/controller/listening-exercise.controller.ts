import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ListeningExerciseService } from "../services/listening-exercise.service";
import { ListeningExercise } from "../entities/listening-exercise.entity";
import { CreateListeningExerciseDto } from "../dto/create-listening-exercise.dto";
import { UpdateListeningExerciseDto } from "../dto/update-listening-exercise.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionListeningExerciseDto } from "../dto/condition-listening-exercise.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("listening-exercises")
@ApiTags("ListeningExercise")
export class ListeningExerciseController extends BaseControllerFactory<ListeningExercise>(
    ListeningExercise,
    ConditionListeningExerciseDto,
    CreateListeningExerciseDto,
    UpdateListeningExerciseDto,
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
        private readonly listeningExerciseService: ListeningExerciseService,
    ) {
        super(listeningExerciseService);
    }
}
