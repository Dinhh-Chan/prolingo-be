import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserDailyActivityService } from "../services/user-daily-activity.service";
import { UserDailyActivity } from "../entities/user-daily-activity.entity";
import { CreateUserDailyActivityDto } from "../dto/create-user-daily-activity.dto";
import { UpdateUserDailyActivityDto } from "../dto/update-user-daily-activity.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserDailyActivityDto } from "../dto/condition-user-daily-activity.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-daily-activities")
@ApiTags("UserDailyActivity")
export class UserDailyActivityController extends BaseControllerFactory<UserDailyActivity>(
    UserDailyActivity,
    ConditionUserDailyActivityDto,
    CreateUserDailyActivityDto,
    UpdateUserDailyActivityDto,
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
        private readonly userDailyActivityService: UserDailyActivityService,
    ) {
        super(userDailyActivityService);
    }
}
