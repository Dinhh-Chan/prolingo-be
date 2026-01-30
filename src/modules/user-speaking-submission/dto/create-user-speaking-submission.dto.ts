import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserSpeakingSubmissionDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({ description: "Speaking Exercise ID" })
    @IsString()
    @IsNotEmpty({ message: "Speaking Exercise ID không được để trống" })
    @EntityDefinition.field({ label: "Speaking Exercise ID", required: true })
    speaking_exercise_id: string;

    @ApiProperty({ description: "URL audio", maxLength: 500 })
    @IsString()
    @IsNotEmpty({ message: "URL audio không được để trống" })
    @MaxLength(500)
    @EntityDefinition.field({ label: "URL audio", required: true })
    audio_url: string;

    @ApiProperty({ description: "Điểm phát âm", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm phát âm" })
    pronunciation_score?: number;

    @ApiProperty({ description: "Điểm độ trôi chảy", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm độ trôi chảy" })
    fluency_score?: number;

    @ApiProperty({ description: "Phản hồi AI (JSONB)", required: false })
    @IsOptional()
    @EntityDefinition.field({ label: "Phản hồi AI (JSONB)" })
    ai_feedback?: any;
}
