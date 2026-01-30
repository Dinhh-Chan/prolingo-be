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

export class ListeningContent implements BaseEntity {
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
    @MaxLength(200)
    @IsOptional()
    @EntityDefinition.field({ label: "Chủ đề" })
    topic?: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL audio" })
    audio_url?: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL video" })
    video_url?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Bản ghi (tiếng Anh)" })
    transcript_en?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Bản ghi (tiếng Việt)" })
    transcript_vi?: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời lượng (giây)" })
    duration_seconds?: number;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ khó" })
    difficulty_level?: string;

    createdAt?: Date;
}
