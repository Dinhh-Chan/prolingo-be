import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserNotificationSettingService } from "../services/user-notification-setting.service";
import { UserNotificationSetting } from "../entities/user-notification-setting.entity";
import { CreateUserNotificationSettingDto } from "../dto/create-user-notification-setting.dto";
import { UpdateUserNotificationSettingDto } from "../dto/update-user-notification-setting.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserNotificationSettingDto } from "../dto/condition-user-notification-setting.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-notification-settings")
@ApiTags("UserNotificationSetting")
export class UserNotificationSettingController extends BaseControllerFactory<UserNotificationSetting>(
    UserNotificationSetting,
    ConditionUserNotificationSettingDto,
    CreateUserNotificationSettingDto,
    UpdateUserNotificationSettingDto,
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
        private readonly userNotificationSettingService: UserNotificationSettingService,
    ) {
        super(userNotificationSettingService);
    }
}
