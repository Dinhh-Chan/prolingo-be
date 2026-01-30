import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { LessonService } from "../services/lesson.service";
import { Lesson } from "../entities/lesson.entity";
import { CreateLessonDto } from "../dto/create-lesson.dto";
import { UpdateLessonDto } from "../dto/update-lesson.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionLessonDto } from "../dto/condition-lesson.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("lessons")
@ApiTags("Lesson")
export class LessonController extends BaseControllerFactory<Lesson>(
    Lesson,
    ConditionLessonDto,
    CreateLessonDto,
    UpdateLessonDto,
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
    constructor(private readonly lessonService: LessonService) {
        super(lessonService);
    }
}
