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

export class ListeningExercise implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "Content ID không được để trống" })
    @EntityDefinition.field({ label: "Content ID", required: true })
    content_id: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại bài tập" })
    exercise_type?: string;

    @IsString()
    @IsNotEmpty({ message: "Dữ liệu câu hỏi không được để trống" })
    @EntityDefinition.field({
        label: "Dữ liệu câu hỏi (JSONB)",
        required: true,
    })
    question_data: any;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời điểm bắt đầu" })
    time_start?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời điểm kết thúc" })
    time_end?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm số" })
    points?: number;
}
