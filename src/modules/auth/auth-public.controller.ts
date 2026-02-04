import { ApiRecordResponse } from "@common/decorator/api.decorator";
import { AuthService } from "@module/auth/auth.service";
import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { FacebookLoginDto } from "./dto/facebook-login.dto";
import { GoogleLoginDto } from "./dto/google-login.dto";
import { LoginRequestDto } from "./dto/login-request.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { LogoutDto } from "./dto/logout.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { ResetPasswordOtpDto } from "./dto/reset-password-otp.dto";
import { SendOtpDto } from "./dto/send-otp.dto";
import { VerifyOtpLoginDto } from "./dto/verify-otp-login.dto";
import { Auth } from "./entities/auth.entity";

@Controller("auth")
@ApiTags("auth")
export class AuthPublicController {
    constructor(private readonly authService: AuthService) {}

    @ApiRecordResponse(LoginResponseDto)
    @Post("login")
    async login(@Req() req: Request, @Body() dto: LoginRequestDto) {
        return this.authService.login(req, dto);
    }

    @ApiRecordResponse(LoginResponseDto)
    @Post("facebook")
    @ApiOperation({
        summary: "Đăng nhập bằng Facebook",
        description:
            "Gửi access_token từ Facebook SDK. Frontend dùng FB.login() lấy token rồi gửi lên.",
    })
    async loginFacebook(@Req() req: Request, @Body() dto: FacebookLoginDto) {
        return this.authService.loginWithFacebook(req, dto);
    }

    @ApiRecordResponse(LoginResponseDto)
    @Post("google")
    @ApiOperation({
        summary: "Đăng nhập bằng Google",
        description:
            "Gửi idToken (credential) từ Google Sign-In. Frontend dùng Google Identity Services lấy credential rồi gửi lên.",
    })
    async loginGoogle(@Req() req: Request, @Body() dto: GoogleLoginDto) {
        return this.authService.loginWithGoogle(req, dto);
    }

    @ApiRecordResponse(Auth)
    @Post("logout")
    async logout(@Body() dto: LogoutDto) {
        await this.authService.logout(dto);
    }

    @ApiRecordResponse(LoginRequestDto)
    @Post("refresh")
    async refreshToken(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshTokens(dto);
    }

    @Post("otp/send")
    @ApiOperation({
        summary: "Gửi mã OTP qua email",
        description:
            "Gửi mã OTP 6 số đến email. type: login (đăng nhập) hoặc forgot_password (quên mật khẩu). Mã có hiệu lực 5 phút.",
    })
    async sendOtp(@Body() dto: SendOtpDto) {
        return this.authService.sendOtp(dto);
    }

    @ApiRecordResponse(LoginResponseDto)
    @Post("otp/login")
    @ApiOperation({
        summary: "Đăng nhập bằng mã OTP",
        description:
            "Xác thực OTP và trả về accessToken, refreshToken. OTP sai trả về lỗi.",
    })
    async loginOtp(@Req() req: Request, @Body() dto: VerifyOtpLoginDto) {
        return this.authService.loginWithOtp(req, dto);
    }

    @ApiRecordResponse(LoginResponseDto)
    @Post("otp/reset-password")
    @ApiOperation({
        summary: "Đặt lại mật khẩu bằng OTP",
        description:
            "Xác thực OTP, cập nhật mật khẩu mới và trả về accessToken, refreshToken.",
    })
    async resetPasswordOtp(@Body() dto: ResetPasswordOtpDto) {
        return this.authService.resetPasswordWithOtp(dto);
    }
}
