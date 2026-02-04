import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class VerifyOtpLoginDto {
    @ApiProperty({ description: "Email đã nhận OTP" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Mã OTP 6 số", minLength: 6, maxLength: 6 })
    @IsString()
    @Length(6, 6)
    otp: string;
}
