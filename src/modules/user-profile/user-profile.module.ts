import { UserProfileController } from "./controller/user-profile.controller";
import { UserProfileService } from "./services/user-profile.service";
import { UserProfileModel } from "./models/user-profile.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserProfileRepositorySql } from "./repository/user-profile-repository.sql";
import { IndustryModule } from "../industry/industry.module";
import { JobRoleModule } from "../job-role/job-role.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UserProfileModel]),
        IndustryModule,
        JobRoleModule,
        UserModule,
    ],
    controllers: [UserProfileController],
    providers: [
        UserProfileService,
        RepositoryProvider(Entity.USER_PROFILE, UserProfileRepositorySql),
    ],
    exports: [UserProfileService],
})
export class UserProfileModule {}
