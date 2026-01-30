import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsBoolean,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLearningPathDto {
    @ApiProperty({
        description: "Tên lộ trình học (tiếng Anh)",
        maxLength: 200,
    })
    @IsString()
    @IsNotEmpty({ message: "Tên lộ trình học (tiếng Anh) không được để trống" })
    @MaxLength(200)
    @EntityDefinition.field({
        label: "Tên lộ trình học (tiếng Anh)",
        required: true,
    })
    name_en: string;

    @ApiProperty({
        description: "Tên lộ trình học (tiếng Việt)",
        maxLength: 200,
    })
    @IsString()
    @IsNotEmpty({
        message: "Tên lộ trình học (tiếng Việt) không được để trống",
    })
    @MaxLength(200)
    @EntityDefinition.field({
        label: "Tên lộ trình học (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    @ApiProperty({ description: "Industry ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    @ApiProperty({ description: "Certification ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Certification ID" })
    certification_id?: string;

    @ApiProperty({
        description: "Mức độ mục tiêu (beginner, intermediate, advanced)",
        maxLength: 20,
        required: false,
    })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ mục tiêu" })
    target_level?: string;

    @ApiProperty({ description: "Mô tả", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả" })
    description?: string;

    @ApiProperty({ description: "Số giờ ước tính", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Số giờ ước tính" })
    estimated_hours?: number;

    @ApiProperty({
        description: "Trạng thái hoạt động",
        default: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Trạng thái hoạt động" })
    is_active?: boolean;
}
