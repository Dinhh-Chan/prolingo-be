import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWritingExerciseDto {
    @ApiProperty({ description: "Template ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Template ID" })
    template_id?: string;

    @ApiProperty({ description: "Tiêu đề", maxLength: 300 })
    @IsString()
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @MaxLength(300)
    @EntityDefinition.field({ label: "Tiêu đề", required: true })
    title: string;

    @ApiProperty({ description: "Đề bài (tiếng Anh)" })
    @IsString()
    @IsNotEmpty({ message: "Đề bài (tiếng Anh) không được để trống" })
    @EntityDefinition.field({ label: "Đề bài (tiếng Anh)", required: true })
    prompt_en: string;

    @ApiProperty({ description: "Tiêu chí đánh giá (JSONB)", required: false })
    @IsOptional()
    @EntityDefinition.field({ label: "Tiêu chí đánh giá (JSONB)" })
    evaluation_criteria?: any;
}
