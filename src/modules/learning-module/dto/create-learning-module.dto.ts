import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLearningModuleDto {
    @ApiProperty({ description: "Path ID" })
    @IsString()
    @IsNotEmpty({ message: "Path ID không được để trống" })
    @EntityDefinition.field({ label: "Path ID", required: true })
    path_id: string;

    @ApiProperty({ description: "Tên module (tiếng Anh)", maxLength: 200 })
    @IsString()
    @IsNotEmpty({ message: "Tên module (tiếng Anh) không được để trống" })
    @MaxLength(200)
    @EntityDefinition.field({ label: "Tên module (tiếng Anh)", required: true })
    name_en: string;

    @ApiProperty({ description: "Tên module (tiếng Việt)", maxLength: 200 })
    @IsString()
    @IsNotEmpty({ message: "Tên module (tiếng Việt) không được để trống" })
    @MaxLength(200)
    @EntityDefinition.field({
        label: "Tên module (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    @ApiProperty({ description: "Thứ tự" })
    @IsNumber()
    @IsNotEmpty({ message: "Thứ tự không được để trống" })
    @EntityDefinition.field({ label: "Thứ tự", required: true })
    order_index: number;
}
