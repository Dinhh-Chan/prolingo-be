import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Gender, SystemRole } from "@module/user/common/constant";

export class Users implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Username", required: true })
    username: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Password" })
    password?: string;

    @IsEmail()
    @EntityDefinition.field({ label: "Email", required: true })
    email: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "First name" })
    firstname?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Last name" })
    lastname?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Full name" })
    fullname?: string;

    @IsEnum(Gender)
    @IsOptional()
    @EntityDefinition.field({ label: "Gender", enum: Object.values(Gender) })
    gender?: Gender;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Date of birth" })
    dob?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "SSO ID" })
    ssoId?: string;

    @IsEnum(SystemRole)
    @EntityDefinition.field({
        label: "System role",
        enum: Object.values(SystemRole),
    })
    systemRole: SystemRole;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Data partition code" })
    dataPartitionCode?: string;

    createdAt?: Date;
    updatedAt?: Date;
}
