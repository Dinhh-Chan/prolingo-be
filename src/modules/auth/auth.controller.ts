import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthConditionDto } from "./dto/auth-condition.dto";
import { Auth } from "./entities/auth.entity";
import { RegisterRequestDto } from "./dto/register-request.dto";
import { Body, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { LoginResponseDto } from "./dto/login-response.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController extends BaseControllerFactory(
    Auth,
    AuthConditionDto,
    Auth,
    Auth,
) {
    constructor(private readonly authService: AuthService) {
        super(authService);
    }

    @Post("register")
    async register(
        @Req() req: Request,
        @Body() dto: RegisterRequestDto,
    ): Promise<LoginResponseDto> {
        return this.authService.register(req, dto);
    }
}
