import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonDto {
    @ApiProperty({ description: "Module ID" })
    @IsString()
    @IsNotEmpty({ message: "Module ID không được để trống" })
    @EntityDefinition.field({ label: "Module ID", required: true })
    module_id: string;

    @ApiProperty({ description: "Tên bài học (tiếng Anh)", maxLength: 200 })
    @IsString()
    @IsNotEmpty({ message: "Tên bài học (tiếng Anh) không được để trống" })
    @MaxLength(200)
    @EntityDefinition.field({
        label: "Tên bài học (tiếng Anh)",
        required: true,
    })
    name_en: string;

    @ApiProperty({ description: "Tên bài học (tiếng Việt)", maxLength: 200 })
    @IsString()
    @IsNotEmpty({ message: "Tên bài học (tiếng Việt) không được để trống" })
    @MaxLength(200)
    @EntityDefinition.field({
        label: "Tên bài học (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    @ApiProperty({ description: "Thứ tự" })
    @IsNumber()
    @IsNotEmpty({ message: "Thứ tự không được để trống" })
    @EntityDefinition.field({ label: "Thứ tự", required: true })
    order_index: number;

    @ApiProperty({
        description:
            "Loại bài học (vocabulary, listening, reading, writing, speaking)",
        maxLength: 50,
        required: false,
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại bài học" })
    lesson_type?: string;

    @ApiProperty({ description: "Số phút ước tính", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Số phút ước tính" })
    estimated_minutes?: number;
}
