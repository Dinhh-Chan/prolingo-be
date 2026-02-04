import {
    OperatorType,
    compareUserPassword,
    createUserPassword,
} from "@common/constant";
import { Configuration } from "@config/configuration";
import { ApiError } from "@config/exception/api-error";
import { BaseService } from "@config/service/base.service";
import {
    AccessSsoJwtPayload,
    RefreshSsoJwtPayload,
} from "@module/auth/auth.interface";
import { Auth } from "@module/auth/entities/auth.entity";
import { AuthRepository } from "@module/auth/repository/auth-repository.interface";
import { Entity } from "@module/repository";
import { CreateDocument } from "@module/repository/common/base-repository.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { ClientPlatform } from "./common/constant";
import { SystemRole } from "@module/user/common/constant";
import { UserRepository } from "@module/user/repository/user-repository.interface";
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { firstValueFrom } from "rxjs";

import { LogoutDto } from "@module/auth/dto/logout.dto";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectTransaction } from "@module/repository/common/transaction";
import { User } from "@module/user/entities/user.entity";
import { OtpType } from "./common/otp-type";
import { EmailService } from "./services/email.service";
import { OtpService } from "./services/otp.service";
import { Request } from "express";
import moment from "moment";
import { UAParser } from "ua-parser-js";
import { FacebookLoginDto } from "./dto/facebook-login.dto";
import { GoogleLoginDto } from "./dto/google-login.dto";
import { ResetPasswordOtpDto } from "./dto/reset-password-otp.dto";
import { SendOtpDto } from "./dto/send-otp.dto";
import { VerifyOtpLoginDto } from "./dto/verify-otp-login.dto";
import { LoginRequestDto } from "./dto/login-request.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

interface FacebookProfile {
    id: string;
    name?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
}

interface GoogleTokenInfo {
    sub: string;
    email?: string;
    email_verified?: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    aud: string;
}

@Injectable()
export class AuthService extends BaseService<Auth, AuthRepository> {
    constructor(
        @InjectRepository(Entity.AUTH)
        private readonly authRepository: AuthRepository,
        @InjectRepository(Entity.USER)
        private readonly userRepository: UserRepository,
        @InjectTransaction()
        private readonly authTransaction: BaseTransaction,
        private readonly configService: ConfigService<Configuration>,
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService,
        private readonly otpService: OtpService,
        private readonly emailService: EmailService,
    ) {
        super(authRepository, { transaction: authTransaction });
    }

    async login(req: Request, dto: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.validatePassword(dto.username, dto.password);
        const auth = await this.createEmptyAuth(user, {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            origin: req.headers["origin"],
            platform: dto.platform,
        });
        const { accessToken, refreshToken } = await this.generateTokens(
            user,
            auth,
        );
        return this.getLoginInfo(accessToken, refreshToken);
    }

    async loginWithFacebook(
        req: Request,
        dto: FacebookLoginDto,
    ): Promise<LoginResponseDto> {
        const profile = await this.verifyFacebookToken(dto.accessToken);
        const user = await this.findOrCreateFacebookUser(profile);
        const auth = await this.createEmptyAuth(user, {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            origin: req.headers["origin"],
            platform: ClientPlatform.WEB,
        });
        const { accessToken, refreshToken } = await this.generateTokens(
            user,
            auth,
        );
        return this.getLoginInfo(accessToken, refreshToken);
    }

    async loginWithGoogle(
        req: Request,
        dto: GoogleLoginDto,
    ): Promise<LoginResponseDto> {
        const profile = await this.verifyGoogleToken(dto.idToken);
        const user = await this.findOrCreateGoogleUser(profile);
        const auth = await this.createEmptyAuth(user, {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            origin: req.headers["origin"],
            platform: ClientPlatform.WEB,
        });
        const { accessToken, refreshToken } = await this.generateTokens(
            user,
            auth,
        );
        return this.getLoginInfo(accessToken, refreshToken);
    }

    async sendOtp(dto: SendOtpDto): Promise<{ expiresIn: number }> {
        const email = dto.email.toLowerCase().trim();
        const user = await this.userRepository.getOne(
            { email },
            { enableDataPartition: false },
        );
        if (!user) {
            throw ApiError.NotFound("error-user-not-found");
        }
        const otp = await this.otpService.setOtp(dto.type, email);
        await this.emailService.sendOtpEmail(email, otp, dto.type);
        return { expiresIn: this.otpService.getExpireSeconds() };
    }

    async loginWithOtp(
        req: Request,
        dto: VerifyOtpLoginDto,
    ): Promise<LoginResponseDto> {
        const email = dto.email.toLowerCase().trim();
        const isValid = await this.otpService.verifyOtp(
            OtpType.LOGIN,
            email,
            dto.otp,
        );
        if (!isValid) {
            throw ApiError.Unauthorized("error-otp-invalid");
        }
        const user = await this.userRepository.getOne(
            { email },
            { enableDataPartition: false },
        );
        if (!user) {
            throw ApiError.NotFound("error-user-not-found");
        }
        const auth = await this.createEmptyAuth(user, {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            origin: req.headers["origin"],
            platform: ClientPlatform.WEB,
        });
        const { accessToken, refreshToken } = await this.generateTokens(
            user,
            auth,
        );
        return this.getLoginInfo(accessToken, refreshToken);
    }

    async resetPasswordWithOtp(
        dto: ResetPasswordOtpDto,
    ): Promise<LoginResponseDto> {
        const email = dto.email.toLowerCase().trim();
        const isValid = await this.otpService.verifyOtp(
            OtpType.FORGOT_PASSWORD,
            email,
            dto.otp,
        );
        if (!isValid) {
            throw ApiError.Unauthorized("error-otp-invalid");
        }
        const user = await this.userRepository.getOne(
            { email },
            { enableDataPartition: false },
        );
        if (!user) {
            throw ApiError.NotFound("error-user-not-found");
        }
        const hashedPassword = await createUserPassword(dto.newPassword);
        await this.userRepository.updateById(user._id, {
            password: hashedPassword,
        });
        const auth = await this.createEmptyAuth(user, {
            ip: "",
            userAgent: "",
            origin: "",
            platform: ClientPlatform.WEB,
        });
        const { accessToken, refreshToken } = await this.generateTokens(
            user,
            auth,
        );
        return this.getLoginInfo(accessToken, refreshToken);
    }

    private async verifyFacebookToken(
        accessToken: string,
    ): Promise<FacebookProfile> {
        const { appId, appSecret } = this.configService.get("facebook", {
            infer: true,
        });
        if (!appId || !appSecret) {
            throw ApiError.BadRequest("error-facebook-not-configured");
        }
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<FacebookProfile>(
                    `https://graph.facebook.com/me`,
                    {
                        params: {
                            fields: "id,name,email,first_name,last_name",
                            access_token: accessToken,
                        },
                    },
                ),
            );
            return data;
        } catch {
            throw ApiError.Unauthorized("error-facebook-token-invalid");
        }
    }

    private async findOrCreateFacebookUser(
        profile: FacebookProfile,
    ): Promise<User> {
        const ssoId = `facebook_${profile.id}`;
        let user = await this.userRepository.getOne(
            { ssoId },
            { enableDataPartition: false },
        );
        if (!user) {
            const email = profile.email || `${profile.id}@facebook.placeholder`;
            const username = `fb_${profile.id}`;
            user = await this.userRepository.create({
                ssoId,
                username,
                email,
                firstname: profile.first_name,
                lastname: profile.last_name,
                fullname: profile.name,
                systemRole: SystemRole.USER,
            });
        }
        return user;
    }

    private async verifyGoogleToken(idToken: string): Promise<GoogleTokenInfo> {
        const { clientId } = this.configService.get("google", {
            infer: true,
        });
        if (!clientId) {
            throw ApiError.BadRequest("error-google-not-configured");
        }
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<GoogleTokenInfo>(
                    `https://oauth2.googleapis.com/tokeninfo`,
                    { params: { id_token: idToken } },
                ),
            );
            if (data.aud !== clientId) {
                throw ApiError.Unauthorized("error-google-token-invalid");
            }
            return data;
        } catch {
            throw ApiError.Unauthorized("error-google-token-invalid");
        }
    }

    private async findOrCreateGoogleUser(
        profile: GoogleTokenInfo,
    ): Promise<User> {
        const ssoId = `google_${profile.sub}`;
        let user = await this.userRepository.getOne(
            { ssoId },
            { enableDataPartition: false },
        );
        if (!user) {
            const email = profile.email || `${profile.sub}@google.placeholder`;
            const username = `google_${profile.sub}`;
            user = await this.userRepository.create({
                ssoId,
                username,
                email,
                firstname: profile.given_name,
                lastname: profile.family_name,
                fullname: profile.name,
                systemRole: SystemRole.USER,
            });
        }
        return user;
    }

    async logout(dto: LogoutDto) {
        const invoke = await this.revokeAuthByRefreshToken(dto.refreshToken);
        if (invoke) {
            return;
        } else {
            throw ApiError.Unauthorized("error-unauthorized");
        }
    }

    async createEmptyAuth(
        user: User,
        data: Pick<Auth, "ip" | "userAgent" | "origin" | "platform">,
    ) {
        const { ip, userAgent, origin, platform } = data;
        const userAgentData = new UAParser(userAgent).getResult();
        const doc: CreateDocument<Auth> = {
            ip,
            userAgent: userAgentData,
            origin,
            platform,
            user: user._id,
        };
        return this.authRepository.create(doc);
    }

    async generateTokens(user: User, auth: Auth) {
        if (!user) {
            throw new UnauthorizedException();
        }
        const { refreshExp } = this.configService.get("jwt", { infer: true });
        if (!auth.exp) {
            auth.exp = Math.floor(
                moment().add(refreshExp, "second").valueOf() / 1000,
            );
        }
        await this.authRepository.updateById(auth._id, auth);
        return this.getTokens(auth, user);
    }

    private async getTokens(auth: Auth, user: User) {
        if (!auth.jti && !auth.exp) {
            throw new BadRequestException();
        }
        const { secret, exp, refreshSecret } = this.configService.get("jwt", {
            infer: true,
        });
        const accessPayload: AccessSsoJwtPayload = {
            jti: auth.jti,
            sub: user._id,
            auth: auth._id,
            username: user.username,
            email: user.email,
            firstName: user.firstname,
            lastName: user.lastname,
            scope: undefined,
            platform: auth.platform,
            systemRole: user.systemRole,
        };
        const refreshPayload: RefreshSsoJwtPayload = {
            jti: auth.jti,
            sub: user._id,
            auth: auth._id,
            username: user.username,
            email: user.email,
            firstName: user.firstname,
            lastName: user.lastname,
            scope: null,
            platform: auth.platform,
            systemRole: user.systemRole,
            exp: auth.exp,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(accessPayload, {
                secret,
                expiresIn: exp,
            }),
            this.jwtService.signAsync(refreshPayload, {
                secret: refreshSecret,
            }),
        ]);
        return { accessToken, refreshToken };
    }

    async refreshTokens(dto: RefreshTokenDto) {
        const payload = this.verifyRefreshToken(dto.refreshToken);
        const auth = await this.authRepository.getOne({
            _id: payload.auth,
            jti: payload.jti,
        });
        if (auth) {
            const user = await this.userRepository.getById(payload.sub);
            const { accessToken, refreshToken } = await this.generateTokens(
                user,
                auth,
            );
            return this.getLoginInfo(accessToken, refreshToken);
        } else {
            throw ApiError.Unauthorized("error-unauthorized");
        }
    }

    private getLoginInfo(
        accessToken: string,
        refreshToken: string,
    ): LoginResponseDto {
        const newAccessPayload = this.jwtService.decode(
            accessToken,
        ) as AccessSsoJwtPayload;
        const newRefreshPayload = this.jwtService.decode(
            refreshToken,
        ) as RefreshSsoJwtPayload;
        return {
            accessToken,
            refreshToken,
            accessExpireAt: newAccessPayload.exp,
            refreshExpireAt: newRefreshPayload.exp,
        };
    }

    async revokeAuthByRefreshToken(refreshToken: string) {
        const payload = this.verifyRefreshToken(refreshToken);
        return this.authRepository.deleteOne({
            _id: payload.auth,
            jti: payload.jti,
        });
    }

    private verifyRefreshToken(refreshToken: string) {
        const { refreshSecret } = this.configService.get("jwt", {
            infer: true,
        });
        try {
            const payload = this.jwtService.verify<RefreshSsoJwtPayload>(
                refreshToken,
                {
                    secret: refreshSecret,
                },
            );
            return payload;
        } catch (err) {
            console.error(err.message);
            throw ApiError.Unauthorized("error-unauthorized");
        }
    }

    private async validatePassword(username: string, password: string) {
        const user = await this.userRepository.getOne(
            { username },
            { enableDataPartition: false },
        );
        if (user) {
            const match = await compareUserPassword(password, user.password);
            if (match) {
                return user;
            }
        }
        throw ApiError.Unauthorized("error-unauthorized");
    }

    async testAuth() {
        const auth = await this.authRepository.getOne(
            {
                $and: [
                    {
                        $or: [{ ip: "a" }, { ip: { $in: ["d", "c"] } }],
                        ip: "c",
                    },
                    {
                        ip: "c",
                    },
                ],
            },
            {
                filters: [
                    {
                        operator: OperatorType.OR,
                        filters: [
                            {
                                field: "ip",
                                operator: OperatorType.EQUAL,
                                values: ["d"],
                            },
                            {
                                field: "ip",
                                operator: OperatorType.EQUAL,
                                values: ["c"],
                            },
                        ],
                    },
                ],
            },
        );
        // return auth;
        return this.authRepository.updateById(auth._id, {
            userAgent: { x: 1 },
            $inc: { exp: -1, test: 1 },
        });
    }
}
