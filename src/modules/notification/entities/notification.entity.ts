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

export class NotificationUser implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại thông báo" })
    type?: string;

    @IsString()
    @MaxLength(200)
    @IsOptional()
    @EntityDefinition.field({ label: "Tiêu đề" })
    title?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Nội dung" })
    message?: string;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Đã đọc" })
    is_read?: boolean;

    createdAt?: Date;
}
