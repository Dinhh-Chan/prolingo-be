import { UserGoalController } from "./controller/user-goal.controller";
import { UserGoalService } from "./services/user-goal.service";
import { UserGoalModel } from "./models/user-goal.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserGoalRepositorySql } from "./repository/user-goal-repository.sql";
import { UserModule } from "../user/user.module";
import { CertificationModule } from "../certification/certification.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UserGoalModel]),
        UserModule,
        CertificationModule,
    ],
    controllers: [UserGoalController],
    providers: [
        UserGoalService,
        RepositoryProvider(Entity.USER_GOAL, UserGoalRepositorySql),
    ],
    exports: [UserGoalService],
})
export class UserGoalModule {}
