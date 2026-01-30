import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { WritingExerciseService } from "../services/writing-exercise.service";
import { WritingExercise } from "../entities/writing-exercise.entity";
import { CreateWritingExerciseDto } from "../dto/create-writing-exercise.dto";
import { UpdateWritingExerciseDto } from "../dto/update-writing-exercise.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionWritingExerciseDto } from "../dto/condition-writing-exercise.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("writing-exercises")
@ApiTags("WritingExercise")
export class WritingExerciseController extends BaseControllerFactory<WritingExercise>(
    WritingExercise,
    ConditionWritingExerciseDto,
    CreateWritingExerciseDto,
    UpdateWritingExerciseDto,
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
        private readonly writingExerciseService: WritingExerciseService,
    ) {
        super(writingExerciseService);
    }
}
