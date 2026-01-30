import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ExerciseIndustryService } from "../services/exercise-industry.service";
import { ExerciseIndustry } from "../entities/exercise-industry.entity";
import { CreateExerciseIndustryDto } from "../dto/create-exercise-industry.dto";
import { UpdateExerciseIndustryDto } from "../dto/update-exercise-industry.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionExerciseIndustryDto } from "../dto/condition-exercise-industry.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("exercise-industries")
@ApiTags("ExerciseIndustry")
export class ExerciseIndustryController extends BaseControllerFactory<ExerciseIndustry>(
    ExerciseIndustry,
    ConditionExerciseIndustryDto,
    CreateExerciseIndustryDto,
    UpdateExerciseIndustryDto,
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
        private readonly exerciseIndustryService: ExerciseIndustryService,
    ) {
        super(exerciseIndustryService);
    }
}
