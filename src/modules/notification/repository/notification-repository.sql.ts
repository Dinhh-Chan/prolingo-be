import { InjectModel } from "@nestjs/sequelize";
import { NotificationUserModel } from "../models/notification.model";
import { NotificationUser } from "../entities/notification.entity";
import { NotificationUserRepository } from "./notification-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class NotificationUserRepositorySql
    extends SqlRepository<NotificationUser>
    implements NotificationUserRepository
{
    constructor(
        @InjectModel(NotificationUserModel)
        private readonly notificationUserModel: typeof NotificationUserModel,
    ) {
        super(notificationUserModel);
    }
}
