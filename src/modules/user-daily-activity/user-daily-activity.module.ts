import { UserDailyActivityController } from "./controller/user-daily-activity.controller";
import { UserDailyActivityService } from "./services/user-daily-activity.service";
import { UserDailyActivityModel } from "./models/user-daily-activity.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserDailyActivityRepositorySql } from "./repository/user-daily-activity-repository.sql";
import { UserModule } from "../user/user.module";

@Module({
    imports: [SequelizeModule.forFeature([UserDailyActivityModel]), UserModule],
    controllers: [UserDailyActivityController],
    providers: [
        UserDailyActivityService,
        RepositoryProvider(
            Entity.USER_DAILY_ACTIVITY,
            UserDailyActivityRepositorySql,
        ),
    ],
    exports: [UserDailyActivityService],
})
export class UserDailyActivityModule {}
