import { StrObjectId } from "@common/constant";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsBoolean,
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from "class-validator";

const CURRENT_STATUS_VALUES = [
    "student",
    "working",
    "switching_career",
] as const;
const ENGLISH_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const DAILY_MINUTES = [10, 15, 20, 30] as const;
const COURSE_WEEKS = [2, 4, 8] as const;

export class Survey implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @MaxLength(64)
    user_id: string;

    @IsOptional()
    @IsString()
    @IsIn(CURRENT_STATUS_VALUES)
    current_status?: string;

    @IsOptional()
    @IsString()
    @MaxLength(64)
    industry_name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(64)
    role_id?: string;

    @IsOptional()
    @IsString()
    @IsIn(ENGLISH_LEVELS)
    english_level?: string;

    @IsOptional()
    @IsNumber()
    @IsIn(DAILY_MINUTES)
    @Min(10)
    @Max(30)
    daily_learning_minutes?: number;

    @IsOptional()
    @IsBoolean()
    daily_reminder_enabled?: boolean;

    @IsOptional()
    @IsString()
    @MaxLength(10)
    reminder_time?: string;

    @IsOptional()
    @IsString()
    custom_focus?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    custom_focus_2?: string;

    @IsOptional()
    @IsNumber()
    @IsIn(COURSE_WEEKS)
    @Min(2)
    @Max(8)
    course_duration_weeks?: number;

    createdAt?: Date;
    updatedAt?: Date;
}
