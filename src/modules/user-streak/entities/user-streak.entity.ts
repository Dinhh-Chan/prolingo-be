import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, IsNumber } from "class-validator";

export class UserStreak implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Chuỗi ngày hiện tại" })
    current_streak?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Chuỗi ngày dài nhất" })
    longest_streak?: number;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày hoạt động cuối" })
    last_activity_date?: string;
}
