import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class GenerateExercisesForLessonDto {
    @ApiProperty({ description: "Lesson ID cần sinh bài tập", example: "..." })
    @IsString()
    @EntityDefinition.field({ label: "Lesson ID", required: true })
    lesson_id: string;

    @ApiProperty({
        description: "Giới hạn số từ (vocab) lấy để tạo exercise cho lesson",
        required: false,
        example: 10,
    })
    @IsOptional()
    @IsInt()
    @Min(2)
    limit?: number;
}
