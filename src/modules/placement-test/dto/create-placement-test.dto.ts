import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlacementTestDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({ description: "Điểm nghe", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm nghe" })
    listening_score?: number;

    @ApiProperty({ description: "Điểm từ vựng", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm từ vựng" })
    vocabulary_score?: number;

    @ApiProperty({ description: "Điểm nói", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm nói" })
    speaking_score?: number;

    @ApiProperty({
        description: "Trình độ tổng thể",
        maxLength: 20,
        required: false,
    })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Trình độ tổng thể" })
    overall_level?: string;

    @ApiProperty({ description: "Ngày thi", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày thi" })
    test_date?: string;

    @ApiProperty({ description: "Đề xuất", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Đề xuất" })
    recommendations?: any;
}
