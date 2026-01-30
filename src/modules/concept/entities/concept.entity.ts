import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, MaxLength } from "class-validator";

export class Concept implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @MaxLength(200)
    @EntityDefinition.field({
        label: "Tên khái niệm (tiếng Anh)",
        required: true,
    })
    name_en: string;

    @IsString()
    @MaxLength(200)
    @IsOptional()
    @EntityDefinition.field({ label: "Tên khái niệm (tiếng Việt)" })
    name_vi?: string;

    @IsString()
    @MaxLength(200)
    @EntityDefinition.field({ label: "Slug", required: true })
    slug: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Định nghĩa (tiếng Anh)" })
    definition_en?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Định nghĩa (tiếng Việt)" })
    definition_vi?: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ khó" })
    difficulty_level?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngữ cảnh sử dụng" })
    usage_context?: string;

    createdAt?: Date;
    updatedAt?: Date;
}
