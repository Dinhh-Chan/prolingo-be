import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserVocabularyProgressService } from "../services/user-vocabulary-progress.service";
import { UserVocabularyProgress } from "../entities/user-vocabulary-progress.entity";
import { CreateUserVocabularyProgressDto } from "../dto/create-user-vocabulary-progress.dto";
import { UpdateUserVocabularyProgressDto } from "../dto/update-user-vocabulary-progress.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserVocabularyProgressDto } from "../dto/condition-user-vocabulary-progress.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-vocabulary-progress")
@ApiTags("UserVocabularyProgress")
export class UserVocabularyProgressController extends BaseControllerFactory<UserVocabularyProgress>(
    UserVocabularyProgress,
    ConditionUserVocabularyProgressDto,
    CreateUserVocabularyProgressDto,
    UpdateUserVocabularyProgressDto,
    {
        authorize: true,
        routes: {
            getMany: {
                enable: false,
            },
            getById: {
                roles: [SystemRole.ADMIN, SystemRole.USER],
            },
        },
    },
) {
    constructor(
        private readonly userVocabularyProgressService: UserVocabularyProgressService,
    ) {
        super(userVocabularyProgressService);
    }
}
