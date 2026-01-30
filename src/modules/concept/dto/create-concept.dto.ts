import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateConceptDto {
    @ApiProperty({ description: "Tên khái niệm (tiếng Anh)", maxLength: 200 })
    @IsString()
    @IsNotEmpty({ message: "Tên khái niệm (tiếng Anh) không được để trống" })
    @MaxLength(200)
    @EntityDefinition.field({
        label: "Tên khái niệm (tiếng Anh)",
        required: true,
    })
    name_en: string;

    @ApiProperty({
        description: "Tên khái niệm (tiếng Việt)",
        maxLength: 200,
        required: false,
    })
    @IsString()
    @MaxLength(200)
    @IsOptional()
    @EntityDefinition.field({ label: "Tên khái niệm (tiếng Việt)" })
    name_vi?: string;

    @ApiProperty({ description: "Slug", maxLength: 200 })
    @IsString()
    @IsNotEmpty({ message: "Slug không được để trống" })
    @MaxLength(200)
    @EntityDefinition.field({ label: "Slug", required: true })
    slug: string;

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

    @ApiProperty({ description: "Ngữ cảnh sử dụng", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngữ cảnh sử dụng" })
    usage_context?: string;
}
