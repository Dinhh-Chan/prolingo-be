import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import FormData from "form-data";
import { Configuration } from "@config/configuration";

export type PronunciationAssessmentApiData = {
    score?: number;
    reference_text?: string;
    transcript?: string;
    mistakes?: unknown[];
    overall_feedback?: string;
};

@Injectable()
export class PronunciationAssessmentClient {
    constructor(private readonly configService: ConfigService<Configuration>) {}

    async assess(
        audioBuffer: Buffer,
        originalFilename: string,
        mimeType: string | undefined,
        referenceText: string,
    ): Promise<{ raw: unknown; data: PronunciationAssessmentApiData | null }> {
        const url = this.configService.get("vocabio", {
            infer: true,
        })?.pronunciationAssessmentUrl;
        if (!url) {
            throw new Error(
                "vocabio.pronunciationAssessmentUrl is not configured",
            );
        }

        const form = new FormData();
        form.append("audio_file", audioBuffer, {
            filename: originalFilename || "audio.bin",
            contentType: mimeType || "application/octet-stream",
        });
        form.append("reference_text", referenceText);

        const response = await axios.post(url, form, {
            headers: form.getHeaders(),
            timeout: 120_000,
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        });

        const raw = response.data;
        const wrapped = raw as {
            data?: PronunciationAssessmentApiData;
            success?: boolean;
        };
        const inner = wrapped?.data ?? (raw as PronunciationAssessmentApiData);
        const data = inner && typeof inner === "object" ? inner : null;
        return { raw, data };
    }
}
