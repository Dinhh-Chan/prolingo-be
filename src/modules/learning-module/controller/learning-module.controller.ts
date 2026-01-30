import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { LearningModuleService } from "../services/learning-module.service";
import { LearningModule } from "../entities/learning-module.entity";
import { CreateLearningModuleDto } from "../dto/create-learning-module.dto";
import { UpdateLearningModuleDto } from "../dto/update-learning-module.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionLearningModuleDto } from "../dto/condition-learning-module.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("learning-modules")
@ApiTags("LearningModule")
export class LearningModuleController extends BaseControllerFactory<LearningModule>(
    LearningModule,
    ConditionLearningModuleDto,
    CreateLearningModuleDto,
    UpdateLearningModuleDto,
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
    constructor(private readonly learningModuleService: LearningModuleService) {
        super(learningModuleService);
    }
}
