import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ExerciseTypeService } from "../services/exercise-type.service";
import { ExerciseType } from "../entities/exercise-type.entity";
import { CreateExerciseTypeDto } from "../dto/create-exercise-type.dto";
import { UpdateExerciseTypeDto } from "../dto/update-exercise-type.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionExerciseTypeDto } from "../dto/condition-exercise-type.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("exercise-types")
@ApiTags("ExerciseType")
export class ExerciseTypeController extends BaseControllerFactory<ExerciseType>(
    ExerciseType,
    ConditionExerciseTypeDto,
    CreateExerciseTypeDto,
    UpdateExerciseTypeDto,
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
    constructor(private readonly exerciseTypeService: ExerciseTypeService) {
        super(exerciseTypeService);
    }
}
