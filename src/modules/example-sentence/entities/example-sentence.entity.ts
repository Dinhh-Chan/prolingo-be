import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class ExampleSentence implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocab_id: string;

    @IsString()
    @IsNotEmpty({ message: "Câu ví dụ (tiếng Anh) không được để trống" })
    @EntityDefinition.field({ label: "Câu ví dụ (tiếng Anh)", required: true })
    sentence_en: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Câu ví dụ (tiếng Việt)" })
    sentence_vi?: string;

    @IsString()
    @MaxLength(100)
    @IsOptional()
    @EntityDefinition.field({ label: "Ngữ cảnh" })
    context?: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL audio" })
    audio_url?: string;
}
