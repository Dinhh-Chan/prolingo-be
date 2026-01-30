import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserVocabularySetDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({ description: "Tên bộ từ vựng", maxLength: 200 })
    @IsString()
    @IsNotEmpty({ message: "Tên bộ từ vựng không được để trống" })
    @MaxLength(200)
    @EntityDefinition.field({ label: "Tên bộ từ vựng", required: true })
    name: string;

    @ApiProperty({ description: "Mô tả", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả" })
    description?: string;

    @ApiProperty({ description: "Công khai", default: false, required: false })
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Công khai" })
    is_public?: boolean;
}
