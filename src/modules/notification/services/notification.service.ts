import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { NotificationUser } from "../entities/notification.entity";
import { NotificationUserRepository } from "../repository/notification-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class NotificationUserService extends BaseService<
    NotificationUser,
    NotificationUserRepository
> {
    constructor(
        @InjectRepository(Entity.NOTIFICATION_USER)
        private readonly notificationUserRepository: NotificationUserRepository,
    ) {
        super(notificationUserRepository, {
            notFoundCode: "error-notification-user-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<NotificationUser>,
    ): Promise<NotificationUser[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<NotificationUser>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
