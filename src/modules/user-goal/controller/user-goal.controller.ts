import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserGoalService } from "../services/user-goal.service";
import { UserGoal } from "../entities/user-goal.entity";
import { CreateUserGoalDto } from "../dto/create-user-goal.dto";
import { UpdateUserGoalDto } from "../dto/update-user-goal.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserGoalDto } from "../dto/condition-user-goal.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-goals")
@ApiTags("UserGoal")
export class UserGoalController extends BaseControllerFactory<UserGoal>(
    UserGoal,
    ConditionUserGoalDto,
    CreateUserGoalDto,
    UpdateUserGoalDto,
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
    constructor(private readonly userGoalService: UserGoalService) {
        super(userGoalService);
    }
}
