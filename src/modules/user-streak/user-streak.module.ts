import { UserStreakController } from "./controller/user-streak.controller";
import { UserStreakService } from "./services/user-streak.service";
import { UserStreakModel } from "./models/user-streak.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserStreakRepositorySql } from "./repository/user-streak-repository.sql";
import { UserModule } from "../user/user.module";

@Module({
    imports: [SequelizeModule.forFeature([UserStreakModel]), UserModule],
    controllers: [UserStreakController],
    providers: [
        UserStreakService,
        RepositoryProvider(Entity.USER_STREAK, UserStreakRepositorySql),
    ],
    exports: [UserStreakService],
})
export class UserStreakModule {}
