import { UserNotificationSettingController } from "./controller/user-notification-setting.controller";
import { UserNotificationSettingService } from "./services/user-notification-setting.service";
import { UserNotificationSettingModel } from "./models/user-notification-setting.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserNotificationSettingRepositorySql } from "./repository/user-notification-setting-repository.sql";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UserNotificationSettingModel]),
        UserModule,
    ],
    controllers: [UserNotificationSettingController],
    providers: [
        UserNotificationSettingService,
        RepositoryProvider(
            Entity.USER_NOTIFICATION_SETTING,
            UserNotificationSettingRepositorySql,
        ),
    ],
    exports: [UserNotificationSettingService],
})
export class UserNotificationSettingModule {}
