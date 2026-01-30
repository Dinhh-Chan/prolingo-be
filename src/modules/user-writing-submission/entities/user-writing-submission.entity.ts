import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class UserWritingSubmission implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @IsNotEmpty({ message: "Writing Exercise ID không được để trống" })
    @EntityDefinition.field({ label: "Writing Exercise ID", required: true })
    writing_exercise_id: string;

    @IsString()
    @IsNotEmpty({ message: "Nội dung không được để trống" })
    @EntityDefinition.field({ label: "Nội dung", required: true })
    content: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm AI" })
    ai_score?: number;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Phản hồi AI (JSONB)" })
    ai_feedback?: any;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Phiên bản đề xuất" })
    suggested_version?: string;

    createdAt?: Date;
}
