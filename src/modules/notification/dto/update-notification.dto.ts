import { PartialType } from "@nestjs/mapped-types";
import { CreateNotificationUserDto } from "./create-notification.dto";

export class UpdateNotificationUserDto extends PartialType(
    CreateNotificationUserDto,
) {}
