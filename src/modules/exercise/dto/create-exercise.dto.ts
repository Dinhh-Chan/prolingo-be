import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExerciseDto {
    @ApiProperty({ description: "Type ID" })
    @IsString()
    @IsNotEmpty({ message: "Type ID không được để trống" })
    @EntityDefinition.field({ label: "Type ID", required: true })
    type_id: string;

    @ApiProperty({ description: "Concept ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Concept ID" })
    concept_id?: string;

    @ApiProperty({ description: "Vocabulary ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Vocabulary ID" })
    vocab_id?: string;

    @ApiProperty({ description: "Tiêu đề", maxLength: 300, required: false })
    @IsString()
    @MaxLength(300)
    @IsOptional()
    @EntityDefinition.field({ label: "Tiêu đề" })
    title?: string;

    @ApiProperty({ description: "Hướng dẫn (tiếng Anh)", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Hướng dẫn (tiếng Anh)" })
    instruction_en?: string;

    @ApiProperty({ description: "Hướng dẫn (tiếng Việt)", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Hướng dẫn (tiếng Việt)" })
    instruction_vi?: string;

    @ApiProperty({ description: "Mức độ khó", maxLength: 20, required: false })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ khó" })
    difficulty_level?: string;

    @ApiProperty({
        description: "Danh mục kỹ năng",
        maxLength: 50,
        required: false,
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Danh mục kỹ năng" })
    skill_category?: string;

    @ApiProperty({ description: "Nội dung bài tập (JSONB)", required: true })
    @IsNotEmpty({ message: "Nội dung bài tập không được để trống" })
    @EntityDefinition.field({
        label: "Nội dung bài tập (JSONB)",
        required: true,
    })
    content: any;

    @ApiProperty({ description: "Thời lượng (giây)", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời lượng (giây)" })
    duration_seconds?: number;

    @ApiProperty({ description: "Điểm số", default: 10, required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm số" })
    points?: number;
}
