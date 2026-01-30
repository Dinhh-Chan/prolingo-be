import { UserSkillStatController } from "./controller/user-skill-stat.controller";
import { UserSkillStatService } from "./services/user-skill-stat.service";
import { UserSkillStatModel } from "./models/user-skill-stat.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserSkillStatRepositorySql } from "./repository/user-skill-stat-repository.sql";
import { UserModule } from "../user/user.module";

@Module({
    imports: [SequelizeModule.forFeature([UserSkillStatModel]), UserModule],
    controllers: [UserSkillStatController],
    providers: [
        UserSkillStatService,
        RepositoryProvider(Entity.USER_SKILL_STAT, UserSkillStatRepositorySql),
    ],
    exports: [UserSkillStatService],
})
export class UserSkillStatModule {}
