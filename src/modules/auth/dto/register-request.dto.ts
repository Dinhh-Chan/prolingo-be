import { PickType } from "@nestjs/swagger";
import { IsEmail, IsString, IsOptional, MinLength } from "class-validator";
import { User } from "@module/user/entities/user.entity";
import { ClientPlatform } from "../common/constant";
import { IsEnum } from "class-validator";

export class RegisterRequestDto extends PickType(User, [
    "username",
    "password",
    "email",
    "firstname",
    "lastname",
]) {
    @IsEnum(ClientPlatform)
    platform: ClientPlatform;

    @IsString()
    @IsOptional()
    @MinLength(6)
    password: string;
}
