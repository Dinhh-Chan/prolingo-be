import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserVocabularyStatDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

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

    @ApiProperty({ description: "Tổng từ vựng", default: 0, required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Tổng từ vựng" })
    total_vocabulary?: number;

    @ApiProperty({
        description: "Từ vựng đã thành thạo",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Từ vựng đã thành thạo" })
    mastered_vocabulary?: number;

    @ApiProperty({
        description: "Phần trăm bao phủ",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Phần trăm bao phủ" })
    coverage_percentage?: number;
}
