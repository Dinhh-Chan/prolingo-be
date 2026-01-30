import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserNotificationSettingDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({
        description: "Bật nhắc nhở hàng ngày",
        default: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Bật nhắc nhở hàng ngày" })
    daily_reminder_enabled?: boolean;

    @ApiProperty({
        description: "Thời gian nhắc nhở",
        default: "20:00:00",
        required: false,
    })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời gian nhắc nhở" })
    reminder_time?: string;

    @ApiProperty({
        description: "Thông báo email",
        default: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Thông báo email" })
    email_notifications?: boolean;

    @ApiProperty({
        description: "Thông báo push",
        default: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Thông báo push" })
    push_notifications?: boolean;
}
