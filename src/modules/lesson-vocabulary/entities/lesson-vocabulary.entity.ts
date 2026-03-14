import { StrObjectId } from "@common/constant";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, IsNumber } from "class-validator";

export class LessonVocabulary implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    lesson_id: string;

    @IsString()
    vocab_id: string;

    @IsNumber()
    @IsOptional()
    order_index?: number;
}
