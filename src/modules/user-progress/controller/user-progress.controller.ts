import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserProgressService } from "../services/user-progress.service";
import { UserProgress } from "../entities/user-progress.entity";
import { CreateUserProgressDto } from "../dto/create-user-progress.dto";
import { UpdateUserProgressDto } from "../dto/update-user-progress.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserProgressDto } from "../dto/condition-user-progress.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-progress")
@ApiTags("UserProgress")
export class UserProgressController extends BaseControllerFactory<UserProgress>(
    UserProgress,
    ConditionUserProgressDto,
    CreateUserProgressDto,
    UpdateUserProgressDto,
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
    constructor(private readonly userProgressService: UserProgressService) {
        super(userProgressService);
    }
}
