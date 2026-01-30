import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserStreakDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({
        description: "Chuỗi ngày hiện tại",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Chuỗi ngày hiện tại" })
    current_streak?: number;

    @ApiProperty({
        description: "Chuỗi ngày dài nhất",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Chuỗi ngày dài nhất" })
    longest_streak?: number;

    @ApiProperty({ description: "Ngày hoạt động cuối", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày hoạt động cuối" })
    last_activity_date?: string;
}
