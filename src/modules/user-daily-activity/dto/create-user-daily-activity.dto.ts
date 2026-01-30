import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDailyActivityDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({ description: "Ngày hoạt động" })
    @IsString()
    @IsNotEmpty({ message: "Ngày hoạt động không được để trống" })
    @EntityDefinition.field({ label: "Ngày hoạt động", required: true })
    activity_date: string;

    @ApiProperty({
        description: "Số bài tập đã hoàn thành",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Số bài tập đã hoàn thành" })
    exercises_completed?: number;

    @ApiProperty({
        description: "Thời gian học (phút)",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời gian học (phút)" })
    time_spent_minutes?: number;

    @ApiProperty({
        description: "Điểm đã kiếm được",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm đã kiếm được" })
    points_earned?: number;
}
