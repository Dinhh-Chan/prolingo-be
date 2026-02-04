import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum } from "class-validator";
import { OtpType } from "../common/otp-type";

export class SendOtpDto {
    @ApiProperty({ description: "Email nhận mã OTP" })
    @IsEmail()
    email: string;

    @ApiProperty({
        description:
            "Loại OTP: login (đăng nhập) hoặc forgot_password (quên mật khẩu)",
        enum: OtpType,
    })
    @IsEnum(OtpType)
    type: OtpType;
}
