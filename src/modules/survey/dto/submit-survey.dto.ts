import { ApiPropertyOptional } from "@nestjs/swagger";
import {
    IsString,
    IsOptional,
    IsNumber,
    IsBoolean,
    Min,
    Max,
    MaxLength,
    IsIn,
} from "class-validator";

const CURRENT_STATUS_VALUES = ["student", "working", "switching_career"];
const ENGLISH_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const DAILY_MINUTES = [10, 15, 20, 30];
const COURSE_WEEKS = [2, 4, 8];

export class SubmitSurveyDto {
    /** Who are you? - student | working | switching_career */
    @ApiPropertyOptional({ enum: CURRENT_STATUS_VALUES })
    @IsOptional()
    @IsString()
    @IsIn(CURRENT_STATUS_VALUES)
    current_status?: string;

    /** Select your field - industry_id (UUID) */
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    industry_id?: string;

    /** Job role (optional) - role_id (UUID) */
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    role_id?: string;

    /** Current English level - A1, A2, B1, B2, C1, C2 */
    @ApiPropertyOptional({ enum: ENGLISH_LEVELS })
    @IsOptional()
    @IsString()
    @IsIn(ENGLISH_LEVELS)
    english_level?: string;

    /** Daily learning goal (minutes per day) - 10, 15, 20, 30 */
    @ApiPropertyOptional({ enum: DAILY_MINUTES })
    @IsOptional()
    @IsNumber()
    @IsIn(DAILY_MINUTES)
    @Min(10)
    @Max(30)
    daily_learning_minutes?: number;

    /** Stay on track - bật nhắc nhở */
    @ApiPropertyOptional({ default: true })
    @IsOptional()
    @IsBoolean()
    daily_reminder_enabled?: boolean;

    /** Stay on track - giờ nhắc nhở (HH:mm hoặc HH:mm:ss), e.g. "19:15" */
    @ApiPropertyOptional({ example: "19:15" })
    @IsOptional()
    @IsString()
    @MaxLength(10)
    reminder_time?: string;

    /** Personalize - mô tả mục tiêu học (Custom Focus) */
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    custom_focus?: string;

    /** Personalize - thời lượng khóa (tuần): 2, 4, 8 */
    @ApiPropertyOptional({ enum: COURSE_WEEKS })
    @IsOptional()
    @IsNumber()
    @IsIn(COURSE_WEEKS)
    @Min(2)
    @Max(8)
    course_duration_weeks?: number;
}
