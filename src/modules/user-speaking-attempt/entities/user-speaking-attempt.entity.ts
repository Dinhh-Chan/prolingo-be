import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsBoolean,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from "class-validator";

/** Một lần user nói — audit + map tiến độ theo mastery level 1–4. */
export class UserSpeakingAttempt implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocab_id: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lesson ID" })
    lesson_id?: string;

    @IsInt()
    @Min(1)
    @Max(4)
    @EntityDefinition.field({ label: "Speaking level (1–4)", required: true })
    speaking_level: number;

    @IsString()
    @EntityDefinition.field({
        label: "Reference text (snapshot)",
        required: true,
    })
    reference_text: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "URL file audio" })
    audio_url?: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm API chấm phát âm" })
    score?: number;

    @IsOptional()
    @EntityDefinition.field({ label: "Raw response API" })
    raw_response?: Record<string, unknown>;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Đạt ngưỡng" })
    passed?: boolean;

    createdAt?: Date;
}
