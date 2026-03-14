import { ApiProperty } from "@nestjs/swagger";
import { SurveyCurrentStatusOptionDto } from "./survey-current-status-option.dto";
import { SurveyEnglishLevelOptionDto } from "./survey-english-level-option.dto";
import { SurveyDailyGoalOptionDto } from "./survey-daily-goal-option.dto";
import { SurveyCourseDurationOptionDto } from "./survey-course-duration-option.dto";
import { IndustryOptionDto } from "./industry-option.dto";
import { JobRoleOptionDto } from "./job-role-option.dto";

export class SurveyOptionsResponseDto {
    @ApiProperty({ type: [SurveyCurrentStatusOptionDto] })
    currentStatusOptions: SurveyCurrentStatusOptionDto[];

    @ApiProperty({ type: [SurveyEnglishLevelOptionDto] })
    englishLevelOptions: SurveyEnglishLevelOptionDto[];

    @ApiProperty({ type: [SurveyDailyGoalOptionDto] })
    dailyGoalOptions: SurveyDailyGoalOptionDto[];

    @ApiProperty({ type: [SurveyCourseDurationOptionDto] })
    courseDurationOptions: SurveyCourseDurationOptionDto[];

    @ApiProperty({ type: [IndustryOptionDto] })
    industries: IndustryOptionDto[];

    @ApiProperty({ type: [JobRoleOptionDto] })
    jobRoles: JobRoleOptionDto[];
}
