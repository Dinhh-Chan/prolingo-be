import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateVocabularyDto {
    @ApiProperty({ description: "Từ vựng", maxLength: 200 })
    @IsString()
    @IsNotEmpty({ message: "Từ vựng không được để trống" })
    @MaxLength(200)
    @EntityDefinition.field({ label: "Từ vựng", required: true })
    word: string;

    @ApiProperty({ description: "Phiên âm", maxLength: 200, required: false })
    @IsString()
    @MaxLength(200)
    @IsOptional()
    @EntityDefinition.field({ label: "Phiên âm" })
    phonetic?: string;

    @ApiProperty({ description: "Loại từ", maxLength: 50, required: false })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại từ" })
    part_of_speech?: string;

    @ApiProperty({ description: "Định nghĩa (tiếng Anh)", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Định nghĩa (tiếng Anh)" })
    definition_en?: string;

    @ApiProperty({ description: "Định nghĩa (tiếng Việt)", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Định nghĩa (tiếng Việt)" })
    definition_vi?: string;

    @ApiProperty({ description: "Mức độ khó", maxLength: 20, required: false })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ khó" })
    difficulty_level?: string;

    @ApiProperty({ description: "URL audio", maxLength: 500, required: false })
    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL audio" })
    audio_url?: string;

    @ApiProperty({
        description: "URL hình ảnh",
        maxLength: 500,
        required: false,
    })
    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL hình ảnh" })
    image_url?: string;
}
