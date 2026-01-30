import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWritingTemplateDto {
    @ApiProperty({ description: "Tiêu đề", maxLength: 300 })
    @IsString()
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @MaxLength(300)
    @EntityDefinition.field({ label: "Tiêu đề", required: true })
    title: string;

    @ApiProperty({
        description:
            "Loại viết (email, report, project_description, comparison)",
        maxLength: 50,
        required: false,
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại viết" })
    writing_type?: string;

    @ApiProperty({ description: "Industry ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    @ApiProperty({ description: "Hướng dẫn cấu trúc", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Hướng dẫn cấu trúc" })
    structure_guide?: string;

    @ApiProperty({ description: "Văn bản mẫu", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Văn bản mẫu" })
    example_text?: string;

    @ApiProperty({ description: "Cụm từ khóa (JSONB)", required: false })
    @IsOptional()
    @EntityDefinition.field({ label: "Cụm từ khóa (JSONB)" })
    key_phrases?: any;
}
