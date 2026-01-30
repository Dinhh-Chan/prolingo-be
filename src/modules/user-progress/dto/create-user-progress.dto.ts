import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserProgressDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({ description: "Path ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Path ID" })
    path_id?: string;

    @ApiProperty({ description: "Module ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Module ID" })
    module_id?: string;

    @ApiProperty({ description: "Lesson ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lesson ID" })
    lesson_id?: string;

    @ApiProperty({
        description: "Trạng thái (not_started, in_progress, completed)",
        maxLength: 20,
        required: false,
    })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Trạng thái" })
    status?: string;

    @ApiProperty({
        description: "Phần trăm hoàn thành",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Phần trăm hoàn thành" })
    completion_percentage?: number;

    @ApiProperty({ description: "Thời điểm bắt đầu", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời điểm bắt đầu" })
    started_at?: string;

    @ApiProperty({ description: "Thời điểm hoàn thành", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời điểm hoàn thành" })
    completed_at?: string;
}
