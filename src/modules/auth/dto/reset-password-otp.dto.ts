import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class ResetPasswordOtpDto {
    @ApiProperty({ description: "Email đã nhận OTP" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Mã OTP 6 số", minLength: 6, maxLength: 6 })
    @IsString()
    @Length(6, 6)
    otp: string;

    @ApiProperty({ description: "Mật khẩu mới", minLength: 6 })
    @IsString()
    @MinLength(6)
    newPassword: string;
}
