import { Module } from "@nestjs/common";
import { SurveyController } from "./controller/survey.controller";
import { SurveyService } from "./services/survey.service";
import { UserProfileModule } from "@module/user-profile/user-profile.module";
import { UserNotificationSettingModule } from "@module/user-notification-setting/user-notification-setting.module";
import { IndustryModule } from "@module/industry/industry.module";
import { JobRoleModule } from "@module/job-role/job-role.module";

@Module({
    imports: [
        UserProfileModule,
        UserNotificationSettingModule,
        IndustryModule,
        JobRoleModule,
    ],
    controllers: [SurveyController],
    providers: [SurveyService],
    exports: [SurveyService],
})
export class SurveyModule {}
