import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { LessonExerciseService } from "../services/lesson-exercise.service";
import { LessonExercise } from "../entities/lesson-exercise.entity";
import { CreateLessonExerciseDto } from "../dto/create-lesson-exercise.dto";
import { UpdateLessonExerciseDto } from "../dto/update-lesson-exercise.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionLessonExerciseDto } from "../dto/condition-lesson-exercise.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("lesson-exercises")
@ApiTags("LessonExercise")
export class LessonExerciseController extends BaseControllerFactory<LessonExercise>(
    LessonExercise,
    ConditionLessonExerciseDto,
    CreateLessonExerciseDto,
    UpdateLessonExerciseDto,
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
    constructor(private readonly lessonExerciseService: LessonExerciseService) {
        super(lessonExerciseService);
    }
}
