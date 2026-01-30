import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCertificationDto {
    @ApiProperty({ description: "Tên chứng chỉ", maxLength: 100 })
    @IsString()
    @IsNotEmpty({ message: "Tên chứng chỉ không được để trống" })
    @MaxLength(100)
    @EntityDefinition.field({ label: "Tên chứng chỉ", required: true })
    name: string;

    @ApiProperty({
        description: "Mã chứng chỉ (TOEIC, IELTS, etc.)",
        maxLength: 50,
    })
    @IsString()
    @IsNotEmpty({ message: "Mã chứng chỉ không được để trống" })
    @MaxLength(50)
    @EntityDefinition.field({ label: "Mã chứng chỉ", required: true })
    code: string;

    @ApiProperty({ description: "Mô tả", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả" })
    description?: string;

    @ApiProperty({ description: "Điểm tối thiểu", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm tối thiểu" })
    target_score_min?: number;

    @ApiProperty({ description: "Điểm tối đa", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm tối đa" })
    target_score_max?: number;

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
