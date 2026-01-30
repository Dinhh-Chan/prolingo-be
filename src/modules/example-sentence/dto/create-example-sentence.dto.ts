import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExampleSentenceDto {
    @ApiProperty({ description: "Vocabulary ID" })
    @IsString()
    @IsNotEmpty({ message: "Vocabulary ID không được để trống" })
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocab_id: string;

    @ApiProperty({ description: "Câu ví dụ (tiếng Anh)" })
    @IsString()
    @IsNotEmpty({ message: "Câu ví dụ (tiếng Anh) không được để trống" })
    @EntityDefinition.field({ label: "Câu ví dụ (tiếng Anh)", required: true })
    sentence_en: string;

    @ApiProperty({ description: "Câu ví dụ (tiếng Việt)", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Câu ví dụ (tiếng Việt)" })
    sentence_vi?: string;

    @ApiProperty({
        description: "Ngữ cảnh (academic, workplace, casual)",
        maxLength: 100,
        required: false,
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    @EntityDefinition.field({ label: "Ngữ cảnh" })
    context?: string;

    @ApiProperty({ description: "URL audio", maxLength: 500, required: false })
    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL audio" })
    audio_url?: string;
}
