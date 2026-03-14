import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsString,
    IsOptional,
    IsNumber,
    MaxLength,
    Min,
    Max,
} from "class-validator";

export class UserProfile implements BaseEntity {
    @StrObjectId()
    _id: string;

    /**
     * User ID
     */
    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    /**
     * Industry ID
     */
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    /**
     * Role ID
     */
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Role ID" })
    role_id?: string;

    /**
     * Trạng thái hiện tại (student | working | switching_career)
     */
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Trạng thái hiện tại" })
    current_status?: string;

    /**
     * Trình độ tiếng Anh (A1-C2)
     */
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Trình độ tiếng Anh" })
    english_level?: string;

    /**
     * Mục tiêu học mỗi ngày (phút): 10, 15, 20, 30
     */
    @IsNumber()
    @IsOptional()
    @Min(10)
    @Max(60)
    @EntityDefinition.field({ label: "Mục tiêu học mỗi ngày (phút)" })
    daily_learning_minutes?: number;

    /**
     * Mô tả mục tiêu tùy chỉnh (Personalize your journey)
     */
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Trọng tâm học tùy chỉnh" })
    custom_focus?: string;

    /**
     * Thời lượng khóa học (tuần): 2, 4, 8
     */
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(12)
    @EntityDefinition.field({ label: "Thời lượng khóa học (tuần)" })
    course_duration_weeks?: number;

    /**
     * Ngày cập nhật
     */
    updatedAt?: Date;
}
