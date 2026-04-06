import { spawn } from "child_process";
import * as path from "path";
import ffmpegPath from "ffmpeg-static";

/** Đuôi file mà API aivocabio chấp nhận (theo message lỗi upstream). */
export const UPSTREAM_AUDIO_ACCEPTED_EXT = [".mp3", ".ogg", ".oga"] as const;

export function needsTranscodeToMp3ForUpstream(originalName: string): boolean {
    const ext = path.extname(originalName || "").toLowerCase();
    if (!ext) {
        return true;
    }
    return !(UPSTREAM_AUDIO_ACCEPTED_EXT as readonly string[]).includes(ext);
}

/**
 * Gợi ý demuxer cho ffmpeg khi đọc từ pipe:0 (không có tên file để probe).
 * M4A/MP4 audio cần `-f mov` hoặc `-f mp4`, nếu không ffmpeg có thể ra file 0s / rỗng.
 */
export function ffmpegInputFormatArgsBeforePipe(
    originalName: string,
    mimeType?: string,
): string[] {
    const ext = path.extname(originalName || "").toLowerCase();
    const mime = (mimeType || "").toLowerCase();

    if ([".m4a", ".mp4", ".mov", ".m4v", ".3gp"].includes(ext)) {
        return ["-f", "mov"];
    }
    if (mime.includes("mp4") || mime.includes("m4a") || mime.includes("3gpp")) {
        return ["-f", "mov"];
    }

    if (ext === ".webm" || mime.includes("webm")) {
        return ["-f", "webm"];
    }

    if (ext === ".wav" || mime.includes("wav")) {
        return ["-f", "wav"];
    }

    if ([".ogg", ".oga", ".opus"].includes(ext) || mime.includes("ogg")) {
        return ["-f", "ogg"];
    }

    if (ext === ".flac" || mime.includes("flac")) {
        return ["-f", "flac"];
    }

    if (ext === ".aac" || mime.includes("aac")) {
        return ["-f", "aac"];
    }

    if (ext === ".mp3" || mime.includes("mpeg") || mime.includes("mp3")) {
        return ["-f", "mp3"];
    }

    return [];
}

const MIN_MP3_BYTES = 400;

/**
 * Chuyển buffer âm thanh (m4a, wav, webm, aac, …) sang MP3 để gửi API chấm điểm.
 * Dùng ffmpeg (ffmpeg-static). Chuẩn hóa 16 kHz mono để tương thích nhiều engine phía sau.
 */
export async function transcodeAudioBufferToMp3(
    input: Buffer,
    originalName: string,
    mimeType?: string,
): Promise<Buffer> {
    if (!input?.length) {
        throw new Error("Empty audio buffer");
    }
    if (!ffmpegPath) {
        throw new Error("ffmpeg-static binary is not available");
    }

    const demuxArgs = ffmpegInputFormatArgsBeforePipe(originalName, mimeType);

    const run = (extraDemux: readonly string[]) =>
        new Promise<Buffer>((resolve, reject) => {
            const ff = spawn(
                ffmpegPath as string,
                [
                    "-hide_banner",
                    "-loglevel",
                    "error",
                    ...extraDemux,
                    "-i",
                    "pipe:0",
                    "-vn",
                    "-ar",
                    "16000",
                    "-ac",
                    "1",
                    "-acodec",
                    "libmp3lame",
                    "-b:a",
                    "64k",
                    "-f",
                    "mp3",
                    "-",
                ],
                {
                    stdio: ["pipe", "pipe", "pipe"],
                },
            );

            const chunks: Buffer[] = [];
            let stderr = "";

            ff.stdout.on("data", (c: Buffer) => chunks.push(c));
            ff.stderr.on("data", (c: Buffer) => {
                stderr += c.toString();
            });

            const timeout = setTimeout(() => {
                ff.kill("SIGKILL");
                reject(new Error("ffmpeg transcoding timed out"));
            }, 90_000);

            ff.on("error", (err) => {
                clearTimeout(timeout);
                reject(err);
            });

            ff.on("close", (code) => {
                clearTimeout(timeout);
                if (code === 0) {
                    const out = Buffer.concat(chunks);
                    if (out.length < MIN_MP3_BYTES) {
                        reject(
                            new Error(
                                `Output MP3 quá nhỏ (${out.length} bytes) — có thể không đọc được input`,
                            ),
                        );
                        return;
                    }
                    resolve(out);
                } else {
                    const msg =
                        stderr.trim() || `ffmpeg exited with code ${code}`;
                    reject(new Error(msg));
                }
            });

            ff.stdin.end(input);
        });

    try {
        return await run(demuxArgs);
    } catch (firstErr) {
        if (demuxArgs.length > 0) {
            throw firstErr;
        }
        for (const fallback of [
            ["-f", "mov"],
            ["-f", "mp4"],
        ] as const) {
            try {
                return await run(fallback);
            } catch {
                /* thử demuxer kế tiếp */
            }
        }
        throw firstErr;
    }
}
