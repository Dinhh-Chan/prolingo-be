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

export class LearningModule implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "Path ID không được để trống" })
    @EntityDefinition.field({ label: "Path ID", required: true })
    path_id: string;

    @IsString()
    @MaxLength(200)
    @IsNotEmpty({ message: "Tên module (tiếng Anh) không được để trống" })
    @EntityDefinition.field({ label: "Tên module (tiếng Anh)", required: true })
    name_en: string;

    @IsString()
    @MaxLength(200)
    @IsNotEmpty({ message: "Tên module (tiếng Việt) không được để trống" })
    @EntityDefinition.field({
        label: "Tên module (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    @IsNumber()
    @IsNotEmpty({ message: "Thứ tự không được để trống" })
    @EntityDefinition.field({ label: "Thứ tự", required: true })
    order_index: number;

    createdAt?: Date;
}
