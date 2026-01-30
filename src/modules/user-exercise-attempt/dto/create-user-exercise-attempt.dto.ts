import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsBoolean,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserExerciseAttemptDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({ description: "Exercise ID" })
    @IsString()
    @IsNotEmpty({ message: "Exercise ID không được để trống" })
    @EntityDefinition.field({ label: "Exercise ID", required: true })
    exercise_id: string;

    @ApiProperty({ description: "Lesson ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lesson ID" })
    lesson_id?: string;

    @ApiProperty({ description: "Câu trả lời (JSONB)", required: false })
    @IsOptional()
    @EntityDefinition.field({ label: "Câu trả lời (JSONB)" })
    answers?: any;

    @ApiProperty({ description: "Điểm số", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm số" })
    score?: number;

    @ApiProperty({ description: "Đúng", required: false })
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Đúng" })
    is_correct?: boolean;

    @ApiProperty({ description: "Thời gian làm bài (giây)", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời gian làm bài (giây)" })
    time_spent_seconds?: number;
}
