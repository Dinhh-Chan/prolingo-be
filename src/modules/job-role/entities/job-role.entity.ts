import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, IsBoolean, MaxLength } from "class-validator";

export class JobRole implements BaseEntity {
    @StrObjectId()
    _id: string;

    /**
     * Industry ID
     */
    @IsString()
    @EntityDefinition.field({ label: "Industry ID", required: true })
    industry_id: string;

    /**
     * Tên vai trò (tiếng Anh)
     */
    @IsString()
    @MaxLength(100)
    @EntityDefinition.field({
        label: "Tên vai trò (tiếng Anh)",
        required: true,
    })
    name_en: string;

    /**
     * Tên vai trò (tiếng Việt)
     */
    @IsString()
    @MaxLength(100)
    @EntityDefinition.field({
        label: "Tên vai trò (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    /**
     * Slug duy nhất
     */
    @IsString()
    @MaxLength(100)
    @EntityDefinition.field({ label: "Slug", required: true })
    slug: string;

    /**
     * Mô tả
     */
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả" })
    description?: string;

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
