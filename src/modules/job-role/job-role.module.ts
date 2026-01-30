import { JobRoleController } from "./controller/job-role.controller";
import { JobRoleService } from "./services/job-role.service";
import { JobRoleModel } from "./models/job-role.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { JobRoleRepositorySql } from "./repository/job-role-repository.sql";
import { IndustryModule } from "../industry/industry.module";

@Module({
    imports: [SequelizeModule.forFeature([JobRoleModel]), IndustryModule],
    controllers: [JobRoleController],
    providers: [
        JobRoleService,
        RepositoryProvider(Entity.JOB_ROLE, JobRoleRepositorySql),
    ],
    exports: [JobRoleService],
})
export class JobRoleModule {}
