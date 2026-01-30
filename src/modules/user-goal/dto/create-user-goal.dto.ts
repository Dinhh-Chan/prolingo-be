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

export class CreateUserGoalDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({ description: "Loại mục tiêu", maxLength: 50 })
    @IsString()
    @IsNotEmpty({ message: "Loại mục tiêu không được để trống" })
    @MaxLength(50)
    @EntityDefinition.field({ label: "Loại mục tiêu", required: true })
    goal_type: string;

    @ApiProperty({ description: "Certification ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Certification ID" })
    certification_id?: string;

    @ApiProperty({ description: "Điểm mục tiêu", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm mục tiêu" })
    target_score?: number;

    @ApiProperty({ description: "Ngày mục tiêu", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày mục tiêu" })
    target_date?: string;

    @ApiProperty({
        description: "Mục tiêu chính",
        default: false,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Mục tiêu chính" })
    is_primary?: boolean;
}
