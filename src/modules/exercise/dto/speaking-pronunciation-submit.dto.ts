import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class SpeakingPronunciationSubmitDto {
    @ApiProperty({ description: "ID từ vựng" })
    @IsString()
    vocab_id: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    lesson_id?: string;

    /**
     * Nếu bỏ trống: dùng `word` từ vocabulary.
     * Phải khớp nội dung đã học / đã sinh bài.
     */
    @ApiProperty({
        required: false,
        description: "Text chấm điểm (mặc định = từ trong DB)",
    })
    @IsString()
    @IsOptional()
    reference_text?: string;

    @ApiProperty({
        required: false,
        description: "1–4, mặc định 1 (phát âm từ đơn)",
        minimum: 1,
        maximum: 4,
    })
    @Transform(({ value }) =>
        value === "" || value === undefined
            ? undefined
            : parseInt(String(value), 10),
    )
    @IsInt()
    @Min(1)
    @Max(4)
    @IsOptional()
    speaking_level?: number;
}
