import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserStreakService } from "../services/user-streak.service";
import { UserStreak } from "../entities/user-streak.entity";
import { CreateUserStreakDto } from "../dto/create-user-streak.dto";
import { UpdateUserStreakDto } from "../dto/update-user-streak.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserStreakDto } from "../dto/condition-user-streak.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-streaks")
@ApiTags("UserStreak")
export class UserStreakController extends BaseControllerFactory<UserStreak>(
    UserStreak,
    ConditionUserStreakDto,
    CreateUserStreakDto,
    UpdateUserStreakDto,
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
    constructor(private readonly userStreakService: UserStreakService) {
        super(userStreakService);
    }
}
