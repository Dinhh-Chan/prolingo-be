import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsBoolean,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonExerciseDto {
    @ApiProperty({ description: "Lesson ID" })
    @IsString()
    @IsNotEmpty({ message: "Lesson ID không được để trống" })
    @EntityDefinition.field({ label: "Lesson ID", required: true })
    lesson_id: string;

    @ApiProperty({ description: "Exercise ID" })
    @IsString()
    @IsNotEmpty({ message: "Exercise ID không được để trống" })
    @EntityDefinition.field({ label: "Exercise ID", required: true })
    exercise_id: string;

    @ApiProperty({ description: "Thứ tự", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thứ tự" })
    order_index?: number;

    @ApiProperty({ description: "Bắt buộc", default: true, required: false })
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Bắt buộc" })
    is_required?: boolean;
}
