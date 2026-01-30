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

export class Lesson implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "Module ID không được để trống" })
    @EntityDefinition.field({ label: "Module ID", required: true })
    module_id: string;

    @IsString()
    @MaxLength(200)
    @IsNotEmpty({ message: "Tên bài học (tiếng Anh) không được để trống" })
    @EntityDefinition.field({
        label: "Tên bài học (tiếng Anh)",
        required: true,
    })
    name_en: string;

    @IsString()
    @MaxLength(200)
    @IsNotEmpty({ message: "Tên bài học (tiếng Việt) không được để trống" })
    @EntityDefinition.field({
        label: "Tên bài học (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    @IsNumber()
    @IsNotEmpty({ message: "Thứ tự không được để trống" })
    @EntityDefinition.field({ label: "Thứ tự", required: true })
    order_index: number;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại bài học" })
    lesson_type?: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Số phút ước tính" })
    estimated_minutes?: number;

    createdAt?: Date;
}
