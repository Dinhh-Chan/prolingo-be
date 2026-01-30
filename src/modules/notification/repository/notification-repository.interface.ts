import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { NotificationUser } from "../entities/notification.entity";

export interface NotificationUserRepository
    extends BaseRepository<NotificationUser> {}
