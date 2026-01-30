import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsOptional,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateJobRoleDto {
    @ApiProperty({ description: "Industry ID", maxLength: 100 })
    @IsString()
    @IsNotEmpty({ message: "Industry ID không được để trống" })
    @EntityDefinition.field({ label: "Industry ID", required: true })
    industry_id: string;

    @ApiProperty({ description: "Tên vai trò (tiếng Anh)", maxLength: 100 })
    @IsString()
    @IsNotEmpty({ message: "Tên vai trò (tiếng Anh) không được để trống" })
    @MaxLength(100)
    @EntityDefinition.field({
        label: "Tên vai trò (tiếng Anh)",
        required: true,
    })
    name_en: string;

    @ApiProperty({ description: "Tên vai trò (tiếng Việt)", maxLength: 100 })
    @IsString()
    @IsNotEmpty({ message: "Tên vai trò (tiếng Việt) không được để trống" })
    @MaxLength(100)
    @EntityDefinition.field({
        label: "Tên vai trò (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    @ApiProperty({ description: "Slug duy nhất", maxLength: 100 })
    @IsString()
    @IsNotEmpty({ message: "Slug không được để trống" })
    @MaxLength(100)
    @EntityDefinition.field({ label: "Slug", required: true })
    slug: string;

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
