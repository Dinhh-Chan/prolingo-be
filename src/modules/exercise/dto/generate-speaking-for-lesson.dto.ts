import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    IsNotEmpty,
    IsObject,
    IsString,
    ValidateNested,
} from "class-validator";
import { ExerciseTypeRefDto } from "./exercise-type-ref.dto";

export class GenerateSpeakingForLessonDto {
    @ApiProperty({ description: "Lesson ID" })
    @IsString()
    @IsNotEmpty()
    lesson_id: string;

    @ApiProperty({
        description: "Loại bài speaking (phải tồn tại trong exercise_types)",
        type: ExerciseTypeRefDto,
    })
    @IsObject()
    @ValidateNested()
    @Type(() => ExerciseTypeRefDto)
    exercise_type: ExerciseTypeRefDto;
}
