import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { LearningPathService } from "../services/learning-path.service";
import { LearningPath } from "../entities/learning-path.entity";
import { CreateLearningPathDto } from "../dto/create-learning-path.dto";
import { UpdateLearningPathDto } from "../dto/update-learning-path.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionLearningPathDto } from "../dto/condition-learning-path.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("learning-paths")
@ApiTags("LearningPath")
export class LearningPathController extends BaseControllerFactory<LearningPath>(
    LearningPath,
    ConditionLearningPathDto,
    CreateLearningPathDto,
    UpdateLearningPathDto,
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
    constructor(private readonly learningPathService: LearningPathService) {
        super(learningPathService);
    }
}
