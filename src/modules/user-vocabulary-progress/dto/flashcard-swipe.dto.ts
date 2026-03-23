import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum FlashcardSwipeOutcome {
    REMEMBERED = "remembered",
    NOT_REMEMBERED = "not_remembered",
}

export class FlashcardSwipeDto {
    @ApiProperty({ description: "ID từ vựng" })
    @IsString()
    @IsNotEmpty()
    vocab_id: string;

    @ApiProperty({
        enum: FlashcardSwipeOutcome,
        description:
            "remembered = đã nhớ (+1 đến ngưỡng); not_remembered = chưa nhớ (reset streak về 0)",
    })
    @IsEnum(FlashcardSwipeOutcome)
    outcome: FlashcardSwipeOutcome;
}
