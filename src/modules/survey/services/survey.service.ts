import { Injectable } from "@nestjs/common";
import { User } from "@module/user/entities/user.entity";
import { UserProfileService } from "@module/user-profile/services/user-profile.service";
import { UserNotificationSettingService } from "@module/user-notification-setting/services/user-notification-setting.service";
import { IndustryService } from "@module/industry/services/industry.service";
import { JobRoleService } from "@module/job-role/services/job-role.service";
import {
    SURVEY_CURRENT_STATUS_OPTIONS,
    SURVEY_ENGLISH_LEVEL_OPTIONS,
    SURVEY_DAILY_GOAL_OPTIONS,
    SURVEY_COURSE_DURATION_OPTIONS,
} from "../constants/survey-options.constant";
import { SurveyOptionsResponseDto } from "../dto/survey-options-response.dto";
import { SubmitSurveyDto } from "../dto/submit-survey.dto";
import { UserProfile } from "@module/user-profile/entities/user-profile.entity";

@Injectable()
export class SurveyService {
    constructor(
        private readonly userProfileService: UserProfileService,
        private readonly userNotificationSettingService: UserNotificationSettingService,
        private readonly industryService: IndustryService,
        private readonly jobRoleService: JobRoleService,
    ) {}

    /**
     * Lấy toàn bộ lựa chọn cho form khảo sát:
     * Who are you?, Select your field, English level, Daily goal, Course duration
     */
    async getOptions(user: User): Promise<SurveyOptionsResponseDto> {
        const [industries, jobRoles] = await Promise.all([
            this.industryService.getMany(user, { is_active: true }, {}),
            this.jobRoleService.getMany(user, { is_active: true }, {}),
        ]);

        return {
            currentStatusOptions: [...SURVEY_CURRENT_STATUS_OPTIONS],
            englishLevelOptions: [...SURVEY_ENGLISH_LEVEL_OPTIONS],
            dailyGoalOptions: [...SURVEY_DAILY_GOAL_OPTIONS],
            courseDurationOptions: [...SURVEY_COURSE_DURATION_OPTIONS],
            industries: industries.map((i) => ({
                _id: i._id,
                name_en: i.name_en,
                name_vi: i.name_vi,
                slug: i.slug,
            })),
            jobRoles: jobRoles.map((r) => ({
                _id: r._id,
                industry_id: r.industry_id,
                name_en: r.name_en,
                name_vi: r.name_vi,
                slug: r.slug,
            })),
        };
    }

    /**
     * Gửi kết quả khảo sát: cập nhật profile, notification setting
     */
    async submitSurvey(user: User, dto: SubmitSurveyDto) {
        const profile = await this.userProfileService.getOneOrCreate(user);
        const profileUpdate: Partial<UserProfile> = {};
        if (dto.current_status !== undefined)
            profileUpdate.current_status = dto.current_status;
        if (dto.industry_id !== undefined)
            profileUpdate.industry_id = dto.industry_id;
        if (dto.role_id !== undefined) profileUpdate.role_id = dto.role_id;
        if (dto.english_level !== undefined)
            profileUpdate.english_level = dto.english_level;
        if (dto.daily_learning_minutes !== undefined)
            profileUpdate.daily_learning_minutes = dto.daily_learning_minutes;
        if (dto.custom_focus !== undefined)
            profileUpdate.custom_focus = dto.custom_focus;
        if (dto.course_duration_weeks !== undefined)
            profileUpdate.course_duration_weeks = dto.course_duration_weeks;
        await this.userProfileService.updateById(
            user,
            profile._id,
            profileUpdate as any,
        );

        await this.userNotificationSettingService.upsertByUserId(user, {
            daily_reminder_enabled: dto.daily_reminder_enabled,
            reminder_time: dto.reminder_time,
        });

        return { success: true, profile_id: profile._id };
    }
}
