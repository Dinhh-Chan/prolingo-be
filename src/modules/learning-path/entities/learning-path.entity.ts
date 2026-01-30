import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsBoolean,
    MaxLength,
} from "class-validator";

export class LearningPath implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @MaxLength(200)
    @IsNotEmpty({ message: "Tên lộ trình học (tiếng Anh) không được để trống" })
    @EntityDefinition.field({
        label: "Tên lộ trình học (tiếng Anh)",
        required: true,
    })
    name_en: string;

    @IsString()
    @MaxLength(200)
    @IsNotEmpty({
        message: "Tên lộ trình học (tiếng Việt) không được để trống",
    })
    @EntityDefinition.field({
        label: "Tên lộ trình học (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Certification ID" })
    certification_id?: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ mục tiêu" })
    target_level?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả" })
    description?: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Số giờ ước tính" })
    estimated_hours?: number;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Trạng thái hoạt động" })
    is_active?: boolean;

    createdAt?: Date;
}
