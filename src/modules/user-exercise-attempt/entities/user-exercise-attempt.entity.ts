import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsBoolean,
} from "class-validator";

export class UserExerciseAttempt implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @IsNotEmpty({ message: "Exercise ID không được để trống" })
    @EntityDefinition.field({ label: "Exercise ID", required: true })
    exercise_id: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lesson ID" })
    lesson_id?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Câu trả lời (JSONB)" })
    answers?: any;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm số" })
    score?: number;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Đúng" })
    is_correct?: boolean;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời gian làm bài (giây)" })
    time_spent_seconds?: number;

    createdAt?: Date;
}
