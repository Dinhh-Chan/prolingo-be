import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class FlashcardResetLessonDto {
    @ApiProperty({
        description: "ID lesson — reset flashcard cho mọi từ trong lesson",
    })
    @IsString()
    @IsNotEmpty()
    lesson_id: string;
}
