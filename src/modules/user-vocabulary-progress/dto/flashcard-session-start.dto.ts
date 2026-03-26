import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class FlashcardSessionStartDto {
    @ApiProperty({
        description: "Lesson ID chứa bộ flashcard (7 ngày/Day 1...).",
    })
    @IsString()
    lesson_id: string;

    @ApiProperty({
        description: "Số thẻ hiển thị trong 1 session (5-8).",
        required: false,
        default: 7,
    })
    @IsOptional()
    @IsInt()
    @Min(5)
    @Max(8)
    session_size?: number;
}
