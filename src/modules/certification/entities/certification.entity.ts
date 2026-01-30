import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsString,
    IsOptional,
    IsBoolean,
    IsNumber,
    MaxLength,
} from "class-validator";

export class Certification implements BaseEntity {
    @StrObjectId()
    _id: string;

    /**
     * Tên chứng chỉ
     */
    @IsString()
    @MaxLength(100)
    @EntityDefinition.field({ label: "Tên chứng chỉ", required: true })
    name: string;

    /**
     * Mã chứng chỉ (TOEIC, IELTS, etc.)
     */
    @IsString()
    @MaxLength(50)
    @EntityDefinition.field({ label: "Mã chứng chỉ", required: true })
    code: string;

    /**
     * Mô tả
     */
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả" })
    description?: string;

    /**
     * Điểm tối thiểu
     */
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm tối thiểu" })
    target_score_min?: number;

    /**
     * Điểm tối đa
     */
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm tối đa" })
    target_score_max?: number;

    /**
     * Trạng thái hoạt động
     */
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Trạng thái hoạt động" })
    is_active?: boolean;

    /**
     * Ngày tạo
     */
    createdAt?: Date;
    updatedAt?: Date;
}
