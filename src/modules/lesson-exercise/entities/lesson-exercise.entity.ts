import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class LessonExercise implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Lesson ID", required: true })
    lesson_id: string;

    @IsString()
    @EntityDefinition.field({ label: "Exercise ID", required: true })
    exercise_id: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thứ tự" })
    order_index?: number;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Bắt buộc" })
    is_required?: boolean;
}
