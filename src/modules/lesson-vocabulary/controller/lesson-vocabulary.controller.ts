import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { LessonVocabularyService } from "../services/lesson-vocabulary.service";
import { LessonVocabulary } from "../entities/lesson-vocabulary.entity";
import { CreateLessonVocabularyDto } from "../dto/create-lesson-vocabulary.dto";
import { UpdateLessonVocabularyDto } from "../dto/update-lesson-vocabulary.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionLessonVocabularyDto } from "../dto/condition-lesson-vocabulary.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("lesson-vocabulary")
@ApiTags("LessonVocabulary")
export class LessonVocabularyController extends BaseControllerFactory<LessonVocabulary>(
    LessonVocabulary,
    ConditionLessonVocabularyDto,
    CreateLessonVocabularyDto,
    UpdateLessonVocabularyDto,
    {
        authorize: true,
        routes: {
            getMany: { enable: false },
            getById: { roles: [SystemRole.ADMIN] },
        },
    },
) {
    constructor(
        private readonly lessonVocabularyService: LessonVocabularyService,
    ) {
        super(lessonVocabularyService);
    }
}
