import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserVocabularyItemService } from "../services/user-vocabulary-item.service";
import { UserVocabularyItem } from "../entities/user-vocabulary-item.entity";
import { CreateUserVocabularyItemDto } from "../dto/create-user-vocabulary-item.dto";
import { UpdateUserVocabularyItemDto } from "../dto/update-user-vocabulary-item.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserVocabularyItemDto } from "../dto/condition-user-vocabulary-item.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-vocabulary-items")
@ApiTags("UserVocabularyItem")
export class UserVocabularyItemController extends BaseControllerFactory<UserVocabularyItem>(
    UserVocabularyItem,
    ConditionUserVocabularyItemDto,
    CreateUserVocabularyItemDto,
    UpdateUserVocabularyItemDto,
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
        private readonly userVocabularyItemService: UserVocabularyItemService,
    ) {
        super(userVocabularyItemService);
    }
}
