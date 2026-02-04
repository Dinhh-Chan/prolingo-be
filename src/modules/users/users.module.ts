import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersController } from "./controller/users.controller";
import { UsersPublicController } from "./controller/users-public.controller";
import { UsersModel } from "./models/users.model";
import { UsersRepositorySql } from "./repository/users.repository";
import { UsersService } from "./services/users.service";

@Module({
    imports: [SequelizeModule.forFeature([UsersModel])],
    controllers: [UsersController, UsersPublicController],
    providers: [
        UsersService,
        RepositoryProvider(Entity.USERS, UsersRepositorySql),
    ],
    exports: [UsersService],
})
export class UsersModule {}
