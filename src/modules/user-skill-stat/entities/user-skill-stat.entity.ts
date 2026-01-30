import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";

export class UserSkillStat implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Danh mục kỹ năng" })
    skill_category?: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm trung bình" })
    average_score?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ tự tin (0-100)" })
    confidence_level?: number;

    createdAt?: Date;
}
