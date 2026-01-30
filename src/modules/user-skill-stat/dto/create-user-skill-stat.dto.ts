import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserSkillStatDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

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

    @ApiProperty({
        description: "Điểm trung bình",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm trung bình" })
    average_score?: number;

    @ApiProperty({
        description: "Mức độ tự tin (0-100)",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ tự tin (0-100)" })
    confidence_level?: number;
}
