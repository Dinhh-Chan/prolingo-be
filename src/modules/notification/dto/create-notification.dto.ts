import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationUserDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({
        description: "Loại thông báo (reminder, achievement, progress, system)",
        maxLength: 50,
        required: false,
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại thông báo" })
    type?: string;

    @ApiProperty({ description: "Tiêu đề", maxLength: 200, required: false })
    @IsString()
    @MaxLength(200)
    @IsOptional()
    @EntityDefinition.field({ label: "Tiêu đề" })
    title?: string;

    @ApiProperty({ description: "Nội dung", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Nội dung" })
    message?: string;

    @ApiProperty({ description: "Đã đọc", default: false, required: false })
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Đã đọc" })
    is_read?: boolean;
}
