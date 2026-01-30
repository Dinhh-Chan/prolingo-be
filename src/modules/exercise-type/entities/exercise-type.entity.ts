import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    MaxLength,
} from "class-validator";

export class ExerciseType implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty({ message: "Tên loại bài tập (tiếng Anh) không được để trống" })
    @EntityDefinition.field({
        label: "Tên loại bài tập (tiếng Anh)",
        required: true,
    })
    name_en: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty({
        message: "Tên loại bài tập (tiếng Việt) không được để trống",
    })
    @EntityDefinition.field({
        label: "Tên loại bài tập (tiếng Việt)",
        required: true,
    })
    name_vi: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty({ message: "Mã loại bài tập không được để trống" })
    @EntityDefinition.field({ label: "Mã loại bài tập", required: true })
    code: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Danh mục kỹ năng" })
    skill_category?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả" })
    description?: string;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Trạng thái hoạt động" })
    is_active?: boolean;
}
