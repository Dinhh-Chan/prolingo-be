import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class WritingTemplate implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @EntityDefinition.field({ label: "Tiêu đề", required: true })
    title: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại viết" })
    writing_type?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Hướng dẫn cấu trúc" })
    structure_guide?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Văn bản mẫu" })
    example_text?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Cụm từ khóa (JSONB)" })
    key_phrases?: any;
}
