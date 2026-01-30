import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserVocabularySetService } from "../services/user-vocabulary-set.service";
import { UserVocabularySet } from "../entities/user-vocabulary-set.entity";
import { CreateUserVocabularySetDto } from "../dto/create-user-vocabulary-set.dto";
import { UpdateUserVocabularySetDto } from "../dto/update-user-vocabulary-set.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserVocabularySetDto } from "../dto/condition-user-vocabulary-set.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-vocabulary-sets")
@ApiTags("UserVocabularySet")
export class UserVocabularySetController extends BaseControllerFactory<UserVocabularySet>(
    UserVocabularySet,
    ConditionUserVocabularySetDto,
    CreateUserVocabularySetDto,
    UpdateUserVocabularySetDto,
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
        private readonly userVocabularySetService: UserVocabularySetService,
    ) {
        super(userVocabularySetService);
    }
}
