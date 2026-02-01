import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEnum,
    IsArray,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationReceiverType } from "../common/constant";

// Old CreateNotificationDto for MongoDB (used by OneSignal service)
export class CreateNotificationDto {
    @ApiProperty({ description: "Tiêu đề", required: true })
    @IsString()
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @EntityDefinition.field({ label: "Tiêu đề", required: true })
    title: string;

    @ApiProperty({ description: "Tên người gửi", required: true })
    @IsString()
    @IsNotEmpty({ message: "Tên người gửi không được để trống" })
    @EntityDefinition.field({ label: "Tên người gửi", required: true })
    senderName: string;

    @ApiProperty({ description: "ID người gửi", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "ID người gửi" })
    sender?: string;

    @ApiProperty({ description: "Mô tả", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả" })
    description?: string;

    @ApiProperty({ description: "Nội dung", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Nội dung" })
    content?: string;

    @ApiProperty({ description: "URL hình ảnh", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "URL hình ảnh" })
    imageUrl?: string;

    @ApiProperty({ description: "Dữ liệu bổ sung", required: false })
    @IsOptional()
    @EntityDefinition.field({ label: "Dữ liệu bổ sung" })
    data?: any;

    @ApiProperty({
        description: "Loại người nhận",
        enum: NotificationReceiverType,
        required: true,
    })
    @IsEnum(NotificationReceiverType)
    @IsNotEmpty({ message: "Loại người nhận không được để trống" })
    @EntityDefinition.field({ label: "Loại người nhận", required: true })
    receiverType: NotificationReceiverType;

    @ApiProperty({ description: "Danh sách topics", required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @EntityDefinition.field({ label: "Danh sách topics" })
    topics?: string[];

    @ApiProperty({ description: "Danh sách users", required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @EntityDefinition.field({ label: "Danh sách users" })
    users?: string[];

    createdAt?: Date;
}
