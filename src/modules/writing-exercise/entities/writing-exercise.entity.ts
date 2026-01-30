import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class WritingExercise implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Template ID" })
    template_id?: string;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @EntityDefinition.field({ label: "Tiêu đề", required: true })
    title: string;

    @IsString()
    @IsNotEmpty({ message: "Đề bài (tiếng Anh) không được để trống" })
    @EntityDefinition.field({ label: "Đề bài (tiếng Anh)", required: true })
    prompt_en: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Tiêu chí đánh giá (JSONB)" })
    evaluation_criteria?: any;
}
