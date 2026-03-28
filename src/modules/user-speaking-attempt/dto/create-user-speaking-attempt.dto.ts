import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from "class-validator";

export class CreateUserSpeakingAttemptDto {
    @ApiProperty({ description: "User ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "User ID" })
    user_id?: string;

    @ApiProperty({ description: "Vocabulary ID" })
    @IsString()
    @IsNotEmpty({ message: "Vocabulary ID không được để trống" })
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocab_id: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lesson ID" })
    lesson_id?: string;

    @ApiProperty({ description: "1–4", minimum: 1, maximum: 4 })
    @IsInt()
    @Min(1)
    @Max(4)
    @EntityDefinition.field({ label: "Speaking level (1–4)", required: true })
    speaking_level: number;

    @ApiProperty({ description: "Reference text (snapshot)" })
    @IsString()
    @IsNotEmpty()
    @EntityDefinition.field({
        label: "Reference text",
        required: true,
    })
    reference_text: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "URL audio" })
    audio_url?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm" })
    score?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @EntityDefinition.field({ label: "Raw response" })
    raw_response?: Record<string, unknown>;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Đạt ngưỡng" })
    passed?: boolean;
}
