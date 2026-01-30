import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class ReadingContent implements BaseEntity {
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
    @EntityDefinition.field({ label: "Loại nội dung" })
    content_type?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    @IsString()
    @IsNotEmpty({ message: "Nội dung văn bản không được để trống" })
    @EntityDefinition.field({ label: "Nội dung văn bản", required: true })
    content_text: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ khó" })
    difficulty_level?: string;

    createdAt?: Date;
}
