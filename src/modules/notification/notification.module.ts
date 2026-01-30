import { NotificationUserController } from "./controller/notification.controller";
import { NotificationUserService } from "./services/notification.service";
import { NotificationUserModel } from "./models/notification.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { NotificationUserRepositorySql } from "./repository/notification-repository.sql";
import { UserModule } from "../user/user.module";

@Module({
    imports: [SequelizeModule.forFeature([NotificationUserModel]), UserModule],
    controllers: [NotificationUserController],
    providers: [
        NotificationUserService,
        RepositoryProvider(
            Entity.NOTIFICATION_USER,
            NotificationUserRepositorySql,
        ),
    ],
    exports: [NotificationUserService],
})
export class NotificationUserModule {}
