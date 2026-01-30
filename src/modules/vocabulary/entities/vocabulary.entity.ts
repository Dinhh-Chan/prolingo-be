import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, MaxLength } from "class-validator";

export class Vocabulary implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @MaxLength(200)
    @EntityDefinition.field({ label: "Từ vựng", required: true })
    word: string;

    @IsString()
    @MaxLength(200)
    @IsOptional()
    @EntityDefinition.field({ label: "Phiên âm" })
    phonetic?: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại từ" })
    part_of_speech?: string;

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
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL audio" })
    audio_url?: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL hình ảnh" })
    image_url?: string;

    createdAt?: Date;
}
