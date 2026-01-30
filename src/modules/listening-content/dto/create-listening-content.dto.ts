import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateListeningContentDto {
    @ApiProperty({ description: "Tiêu đề", maxLength: 300 })
    @IsString()
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @MaxLength(300)
    @EntityDefinition.field({ label: "Tiêu đề", required: true })
    title: string;

    @ApiProperty({
        description:
            "Loại nội dung (video_short, reel, technical_explanation, conversation)",
        maxLength: 50,
        required: false,
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại nội dung" })
    content_type?: string;

    @ApiProperty({ description: "Industry ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    @ApiProperty({ description: "Chủ đề", maxLength: 200, required: false })
    @IsString()
    @MaxLength(200)
    @IsOptional()
    @EntityDefinition.field({ label: "Chủ đề" })
    topic?: string;

    @ApiProperty({ description: "URL audio", maxLength: 500, required: false })
    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL audio" })
    audio_url?: string;

    @ApiProperty({ description: "URL video", maxLength: 500, required: false })
    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL video" })
    video_url?: string;

    @ApiProperty({ description: "Bản ghi (tiếng Anh)", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Bản ghi (tiếng Anh)" })
    transcript_en?: string;

    @ApiProperty({ description: "Bản ghi (tiếng Việt)", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Bản ghi (tiếng Việt)" })
    transcript_vi?: string;

    @ApiProperty({ description: "Thời lượng (giây)", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời lượng (giây)" })
    duration_seconds?: number;

    @ApiProperty({ description: "Mức độ khó", maxLength: 20, required: false })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ khó" })
    difficulty_level?: string;
}
