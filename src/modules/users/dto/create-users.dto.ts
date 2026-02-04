import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    MinLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";
import { Gender, SystemRole } from "@module/user/common/constant";

export class CreateUsersDto {
    @ApiProperty({ description: "Username", minLength: 3 })
    @IsString()
    @MinLength(3)
    @EntityDefinition.field({ label: "Username", required: true })
    username: string;

    @ApiProperty({ description: "Mật khẩu", minLength: 6, required: false })
    @IsString()
    @MinLength(6)
    @IsOptional()
    @EntityDefinition.field({ label: "Password" })
    password?: string;

    @ApiProperty({ description: "Email" })
    @IsEmail()
    @EntityDefinition.field({ label: "Email", required: true })
    email: string;

    @ApiProperty({ description: "Tên", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "First name" })
    firstname?: string;

    @ApiProperty({ description: "Họ", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Last name" })
    lastname?: string;

    @ApiProperty({ description: "Họ và tên", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Full name" })
    fullname?: string;

    @ApiProperty({ description: "Giới tính", enum: Gender, required: false })
    @IsEnum(Gender)
    @IsOptional()
    @EntityDefinition.field({ label: "Gender", enum: Object.values(Gender) })
    gender?: Gender;

    @ApiProperty({ description: "Ngày sinh (YYYY-MM-DD)", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Date of birth" })
    dob?: string;

    @ApiProperty({ description: "SSO ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "SSO ID" })
    ssoId?: string;

    @ApiProperty({ description: "Vai trò hệ thống", enum: SystemRole })
    @IsEnum(SystemRole)
    @EntityDefinition.field({
        label: "System role",
        enum: Object.values(SystemRole),
    })
    systemRole: SystemRole;

    @ApiProperty({ description: "Data partition code", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Data partition code" })
    dataPartitionCode?: string;
}
