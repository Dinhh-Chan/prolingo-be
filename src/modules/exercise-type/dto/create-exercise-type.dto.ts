import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExerciseTypeDto {
    @ApiProperty({
        description: "Tên loại bài tập (tiếng Anh)",
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty({ message: "Tên loại bài tập (tiếng Anh) không được để trống" })
    @MaxLength(100)
    @EntityDefinition.field({
        label: "Tên loại bài tập (tiếng Anh)",
        required: true,
    })
    name_en: string;

    @ApiProperty({
        description: "Tên loại bài tập (tiếng Việt)",
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty({
        message: "Tên loại bài tập (tiếng Việt) không được để trống",
    })
    @MaxLength(100)
    @EntityDefinition.field({
        label: "Tên loại bài tập (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    @ApiProperty({
        description:
            "Mã loại bài tập (listen_choose, fill_blank, shadowing, etc.)",
        maxLength: 50,
    })
    @IsString()
    @IsNotEmpty({ message: "Mã loại bài tập không được để trống" })
    @MaxLength(50)
    @EntityDefinition.field({ label: "Mã loại bài tập", required: true })
    code: string;

    @ApiProperty({
        description:
            "Danh mục kỹ năng (vocabulary, listening, reading, writing, speaking)",
        maxLength: 50,
        required: false,
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Danh mục kỹ năng" })
    skill_category?: string;

    @ApiProperty({ description: "Mô tả", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả" })
    description?: string;

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
