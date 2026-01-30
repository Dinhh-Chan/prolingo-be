import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";

export class UserSpeakingSubmission implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @IsNotEmpty({ message: "Speaking Exercise ID không được để trống" })
    @EntityDefinition.field({ label: "Speaking Exercise ID", required: true })
    speaking_exercise_id: string;

    @IsString()
    @MaxLength(500)
    @IsNotEmpty({ message: "URL audio không được để trống" })
    @EntityDefinition.field({ label: "URL audio", required: true })
    audio_url: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm phát âm" })
    pronunciation_score?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm độ trôi chảy" })
    fluency_score?: number;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Phản hồi AI (JSONB)" })
    ai_feedback?: any;

    createdAt?: Date;
}
