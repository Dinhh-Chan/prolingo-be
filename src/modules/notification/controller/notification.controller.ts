import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { NotificationUserService } from "../services/notification.service";
import { NotificationUser } from "../entities/notification.entity";
import { CreateNotificationUserDto } from "../dto/create-notification.dto";
import { UpdateNotificationUserDto } from "../dto/update-notification.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionNotificationUserDto } from "../dto/condition-notification.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("notification-users")
@ApiTags("NotificationUser")
export class NotificationUserController extends BaseControllerFactory<NotificationUser>(
    NotificationUser,
    ConditionNotificationUserDto,
    CreateNotificationUserDto,
    UpdateNotificationUserDto,
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
        private readonly notificationUserService: NotificationUserService,
    ) {
        super(notificationUserService);
    }
}
