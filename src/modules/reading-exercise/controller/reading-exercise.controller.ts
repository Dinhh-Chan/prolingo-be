import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ReadingExerciseService } from "../services/reading-exercise.service";
import { ReadingExercise } from "../entities/reading-exercise.entity";
import { CreateReadingExerciseDto } from "../dto/create-reading-exercise.dto";
import { UpdateReadingExerciseDto } from "../dto/update-reading-exercise.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionReadingExerciseDto } from "../dto/condition-reading-exercise.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("reading-exercises")
@ApiTags("ReadingExercise")
export class ReadingExerciseController extends BaseControllerFactory<ReadingExercise>(
    ReadingExercise,
    ConditionReadingExerciseDto,
    CreateReadingExerciseDto,
    UpdateReadingExerciseDto,
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
        private readonly readingExerciseService: ReadingExerciseService,
    ) {
        super(readingExerciseService);
    }
}
