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

export class UserVocabularySet implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @MaxLength(200)
    @IsNotEmpty({ message: "Tên bộ từ vựng không được để trống" })
    @EntityDefinition.field({ label: "Tên bộ từ vựng", required: true })
    name: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả" })
    description?: string;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Công khai" })
    is_public?: boolean;

    createdAt?: Date;
}
