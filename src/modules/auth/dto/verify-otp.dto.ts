import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, Length } from "class-validator";
import { OtpType } from "../common/otp-type";

export class VerifyOtpDto {
    @ApiProperty({ description: "Email đã nhận OTP" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Mã OTP 6 số", minLength: 6, maxLength: 6 })
    @IsString()
    @Length(6, 6)
    otp: string;

    @ApiProperty({
        description:
            "Loại OTP: login (đăng nhập) hoặc forgot_password (quên mật khẩu)",
        enum: OtpType,
    })
    @IsEnum(OtpType)
    type: OtpType;
}
