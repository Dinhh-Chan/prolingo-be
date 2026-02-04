import { Configuration } from "@config/configuration";
import { ApiError } from "@config/exception/api-error";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { OtpType } from "../common/otp-type";

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private readonly configService: ConfigService<Configuration>) {
        const { host, port, user, pass } = this.configService.get("smtp", {
            infer: true,
        });
        if (!user || !pass) {
            this.transporter = null;
            return;
        }
        this.transporter = nodemailer.createTransport({
            host: host || "smtp.gmail.com",
            port: port || 587,
            secure: port === 465,
            auth: { user, pass },
        });
    }

    async sendOtpEmail(to: string, otp: string, type: OtpType): Promise<void> {
        if (!this.transporter) {
            throw ApiError.BadRequest("error-smtp-not-configured");
        }
        const { from } = this.configService.get("smtp", { infer: true });
        const subject =
            type === OtpType.LOGIN
                ? "Mã OTP đăng nhập - Prolingo"
                : "Mã OTP đặt lại mật khẩu - Prolingo";
        const content =
            type === OtpType.LOGIN
                ? `Mã OTP đăng nhập của bạn là: <strong>${otp}</strong>. Mã có hiệu lực trong 5 phút.`
                : `Mã OTP đặt lại mật khẩu của bạn là: <strong>${otp}</strong>. Mã có hiệu lực trong 5 phút.`;

        await this.transporter.sendMail({
            from: from || "noreply@prolingo.com",
            to,
            subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
                    <h2>${subject}</h2>
                    <p>${content}</p>
                    <p style="color: #666; font-size: 12px;">Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.</p>
                </div>
            `,
        });
    }
}
