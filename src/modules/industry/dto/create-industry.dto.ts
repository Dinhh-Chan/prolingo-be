import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsUrl,
    IsOptional,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateIndustryDto {
    @ApiProperty({ description: "Tên ngành nghề (tiếng Anh)", maxLength: 100 })
    @IsString()
    @IsNotEmpty({ message: "Tên ngành nghề (tiếng Anh) không được để trống" })
    @MaxLength(100)
    @EntityDefinition.field({
        label: "Tên ngành nghề (tiếng Anh)",
        required: true,
    })
    name_en: string;

    @ApiProperty({ description: "Tên ngành nghề (tiếng Việt)", maxLength: 100 })
    @IsString()
    @IsNotEmpty({ message: "Tên ngành nghề (tiếng Việt) không được để trống" })
    @MaxLength(100)
    @EntityDefinition.field({
        label: "Tên ngành nghề (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    @ApiProperty({
        description: "Slug duy nhất cho ngành nghề",
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty({ message: "Slug không được để trống" })
    @MaxLength(100)
    @EntityDefinition.field({ label: "Slug", required: true })
    slug: string;

    @ApiProperty({ description: "Mô tả ngành nghề", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả ngành nghề" })
    description?: string;

    @ApiProperty({
        description: "URL icon của ngành nghề",
        maxLength: 500,
        required: false,
    })
    @IsString()
    @IsUrl()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL icon" })
    icon_url?: string;

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
