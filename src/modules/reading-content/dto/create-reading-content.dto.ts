import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReadingContentDto {
    @ApiProperty({ description: "Tiêu đề", maxLength: 300 })
    @IsString()
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @MaxLength(300)
    @EntityDefinition.field({ label: "Tiêu đề", required: true })
    title: string;

    @ApiProperty({
        description:
            "Loại nội dung (academic_paper, technical_docs, case_study)",
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

    @ApiProperty({ description: "Nội dung văn bản" })
    @IsString()
    @IsNotEmpty({ message: "Nội dung văn bản không được để trống" })
    @EntityDefinition.field({ label: "Nội dung văn bản", required: true })
    content_text: string;

    @ApiProperty({ description: "Mức độ khó", maxLength: 20, required: false })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ khó" })
    difficulty_level?: string;
}
