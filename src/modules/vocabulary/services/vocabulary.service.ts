import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { promises as fs } from "fs";
import { join } from "path";
import { Vocabulary } from "../entities/vocabulary.entity";
import { VocabularyDomain } from "../common/vocabulary-domain.enum";
import { VocabularyRepository } from "../repository/vocabulary-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

const TTS_URL = "https://aivocabio.iuptit.com/api/v1/generate/text-to-speech";

@Injectable()
export class VocabularyService extends BaseService<
    Vocabulary,
    VocabularyRepository
> {
    constructor(
        @InjectRepository(Entity.VOCABULARY)
        private readonly vocabularyRepository: VocabularyRepository,
    ) {
        super(vocabularyRepository, {
            notFoundCode: "error-vocabulary-not-found",
            upsertKeys: ["word", "domain"],
        });
    }

    private getTtsFileExt(contentType?: string): string {
        const ct = (contentType || "").toLowerCase();
        if (ct.includes("wav")) return ".wav";
        if (ct.includes("ogg")) return ".ogg";
        // mặc định hầu hết API trả về audio/mpeg
        return ".mp3";
    }

    private async generateAndSaveTtsAudio(params: {
        vocabId: string;
        word: string;
    }): Promise<string> {
        const { vocabId, word } = params;

        const res = await axios.post(
            TTS_URL,
            { text: word, lang: "en" },
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                },
                responseType: "arraybuffer",
                timeout: 360000,
            },
        );

        const contentType = res.headers?.["content-type"];
        const ext = this.getTtsFileExt(contentType);
        const filename = `${vocabId}${ext}`;

        const dir = join(process.cwd(), "public", "vocabulary", "speaking");
        await fs.mkdir(dir, { recursive: true });
        const filePath = join(dir, filename);
        await fs.writeFile(filePath, Buffer.from(res.data));

        // giả định hệ thống nginx/static server sẽ serve từ thư mục public
        return `/vocabulary/speaking/${filename}`;
    }

    /**
     * Tạo vocabulary theo (word, domain).
     * Nếu đã tồn tại thì lấy lại luôn.
     * Nếu chưa có (hoặc audio_url rỗng) thì gọi TTS API và lưu audio_url.
     */
    async create(
        user: User,
        dto: Partial<Vocabulary>,
        options?: any,
    ): Promise<Vocabulary> {
        const word = dto.word?.trim();
        const domain = dto.domain ?? VocabularyDomain.GENERAL;

        if (word) {
            const existed = await this.vocabularyRepository.getOne({
                word,
                domain,
            } as any);

            if (existed) {
                if (existed.audio_url) {
                    return existed;
                }

                const audioUrl = await this.generateAndSaveTtsAudio({
                    vocabId: existed._id,
                    word: existed.word,
                });
                const updated = await this.vocabularyRepository.updateById(
                    existed._id,
                    { audio_url: audioUrl } as any,
                );
                return updated ?? existed;
            }
        }

        const created = await super.create(
            user,
            { ...dto, domain } as any,
            options,
        );

        const audioUrl = await this.generateAndSaveTtsAudio({
            vocabId: created._id,
            word: created.word,
        });
        const updated = await this.vocabularyRepository.updateById(
            created._id,
            { audio_url: audioUrl } as any,
        );
        return updated ?? created;
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<Vocabulary>,
    ): Promise<Vocabulary[]> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { word: 1 },
        };

        return super.getMany(user, conditions, queryWithDefaultSort);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<Vocabulary>,
    ): Promise<any> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { word: 1 },
        };
        return super.getPage(user, conditions, queryWithDefaultSort);
    }
}
