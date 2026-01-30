import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ExerciseService } from "../services/exercise.service";
import { Exercise } from "../entities/exercise.entity";
import { CreateExerciseDto } from "../dto/create-exercise.dto";
import { UpdateExerciseDto } from "../dto/update-exercise.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionExerciseDto } from "../dto/condition-exercise.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("exercises")
@ApiTags("Exercise")
export class ExerciseController extends BaseControllerFactory<Exercise>(
    Exercise,
    ConditionExerciseDto,
    CreateExerciseDto,
    UpdateExerciseDto,
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
    constructor(private readonly exerciseService: ExerciseService) {
        super(exerciseService);
    }
}
