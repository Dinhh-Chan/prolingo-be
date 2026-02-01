import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { Notification } from "../entities/notification-old.entity";
import { NotificationUser } from "../entities/notification.entity";

export interface NotificationUserRepository
    extends BaseRepository<NotificationUser> {}

// Old NotificationRepository for MongoDB (used by OneSignal service)
export interface NotificationRepository extends BaseRepository<Notification> {}
