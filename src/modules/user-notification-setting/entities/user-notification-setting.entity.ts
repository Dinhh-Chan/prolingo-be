import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, IsBoolean } from "class-validator";

export class UserNotificationSetting implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Bật nhắc nhở hàng ngày" })
    daily_reminder_enabled?: boolean;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời gian nhắc nhở" })
    reminder_time?: string;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Thông báo email" })
    email_notifications?: boolean;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Thông báo push" })
    push_notifications?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}
