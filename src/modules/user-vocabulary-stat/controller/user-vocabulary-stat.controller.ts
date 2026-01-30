import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserVocabularyStatService } from "../services/user-vocabulary-stat.service";
import { UserVocabularyStat } from "../entities/user-vocabulary-stat.entity";
import { CreateUserVocabularyStatDto } from "../dto/create-user-vocabulary-stat.dto";
import { UpdateUserVocabularyStatDto } from "../dto/update-user-vocabulary-stat.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserVocabularyStatDto } from "../dto/condition-user-vocabulary-stat.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-vocabulary-stats")
@ApiTags("UserVocabularyStat")
export class UserVocabularyStatController extends BaseControllerFactory<UserVocabularyStat>(
    UserVocabularyStat,
    ConditionUserVocabularyStatDto,
    CreateUserVocabularyStatDto,
    UpdateUserVocabularyStatDto,
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
        private readonly userVocabularyStatService: UserVocabularyStatService,
    ) {
        super(userVocabularyStatService);
    }
}
