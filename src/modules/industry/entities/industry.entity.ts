import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import {
    IsString,
    IsOptional,
    IsBoolean,
    IsUrl,
    MaxLength,
} from "class-validator";

export class Industry implements BaseEntity {
    @StrObjectId()
    _id: string;

    /**
     * Tên ngành nghề (tiếng Anh)
     */
    @IsString()
    @MaxLength(100)
    @EntityDefinition.field({
        label: "Tên ngành nghề (tiếng Anh)",
        required: true,
    })
    name_en: string;

    /**
     * Tên ngành nghề (tiếng Việt)
     */
    @IsString()
    @MaxLength(100)
    @EntityDefinition.field({
        label: "Tên ngành nghề (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    /**
     * Slug duy nhất cho ngành nghề
     */
    @IsString()
    @MaxLength(100)
    @EntityDefinition.field({ label: "Slug", required: true })
    slug: string;

    /**
     * Mô tả ngành nghề
     */
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả ngành nghề" })
    description?: string;

    /**
     * URL icon của ngành nghề
     */
    @IsString()
    @IsUrl()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL icon" })
    icon_url?: string;

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
