import { Configuration } from "@config/configuration";
import { ApiError } from "@config/exception/api-error";
import { InjectRedisClient } from "@module/redis/redis-client.provider";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
import { OtpType, OTP_EXPIRE_SECONDS } from "../common/otp-type";

@Injectable()
export class OtpService {
    private readonly OTP_PREFIX = "otp:";
    private readonly RATE_LIMIT_PREFIX = "otp:rate:";

    constructor(
        @InjectRedisClient()
        private readonly redis: Redis,
        private readonly configService: ConfigService<Configuration>,
    ) {}

    private getKey(type: OtpType, email: string): string {
        const normalizedEmail = email.toLowerCase().trim();
        return `${this.OTP_PREFIX}${type}:${normalizedEmail}`;
    }

    private getRateLimitKey(type: OtpType, email: string): string {
        const normalizedEmail = email.toLowerCase().trim();
        return `${this.RATE_LIMIT_PREFIX}${type}:${normalizedEmail}`;
    }

    generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async setOtp(type: OtpType, email: string): Promise<string> {
        const key = this.getKey(type, email);
        const rateKey = this.getRateLimitKey(type, email);

        const existing = await this.redis.get(rateKey);
        if (existing) {
            const ttl = await this.redis.ttl(rateKey);
            throw ApiError.BadRequest("error-otp-rate-limit", {
                retryAfter: ttl,
            });
        }

        const otp = this.generateOtp();
        await this.redis.setex(key, OTP_EXPIRE_SECONDS, otp);
        await this.redis.setex(rateKey, 60, "1"); // Chặn gửi lại trong 60s

        return otp;
    }

    async verifyOtp(
        type: OtpType,
        email: string,
        otp: string,
    ): Promise<boolean> {
        const key = this.getKey(type, email);
        const stored = await this.redis.get(key);
        if (!stored) {
            return false;
        }
        const isValid = stored === otp;
        if (isValid) {
            await this.redis.del(key);
        }
        return isValid;
    }

    async deleteOtp(type: OtpType, email: string): Promise<void> {
        const key = this.getKey(type, email);
        await this.redis.del(key);
    }

    getExpireSeconds(): number {
        return OTP_EXPIRE_SECONDS;
    }
}
