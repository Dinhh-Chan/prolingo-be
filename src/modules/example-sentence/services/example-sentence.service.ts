import { BaseService } from "@config/service/base.service";
import { GetManyQuery, GetPageQuery } from "@common/constant";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { promises as fs } from "fs";
import { join } from "path";
import { ExampleSentence } from "../entities/example-sentence.entity";
import { ExampleSentenceRepository } from "../repository/example-sentence-repository.interface";
import { User } from "@module/user/entities/user.entity";

const TTS_URL = "https://aivocabio.iuptit.com/api/v1/generate/text-to-speech";

@Injectable()
export class ExampleSentenceService extends BaseService<
    ExampleSentence,
    ExampleSentenceRepository
> {
    constructor(
        @InjectRepository(Entity.EXAMPLE_SENTENCE)
        private readonly exampleSentenceRepository: ExampleSentenceRepository,
    ) {
        super(exampleSentenceRepository, {
            notFoundCode: "error-example-sentence-not-found",
        });
    }

    private getTtsFileExt(contentType?: string): string {
        const ct = (contentType || "").toLowerCase();
        if (ct.includes("wav")) return ".wav";
        if (ct.includes("ogg")) return ".ogg";
        return ".mp3";
    }

    private async generateAndSaveTtsAudio(params: {
        sentenceId: string;
        text: string;
    }): Promise<string> {
        const { sentenceId, text } = params;
        const res = await axios.post(
            TTS_URL,
            { text, lang: "en" },
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                },
                responseType: "arraybuffer",
                timeout: 360000,
            },
        );

        const ext = this.getTtsFileExt(res.headers?.["content-type"]);
        const filename = `${sentenceId}${ext}`;
        const dir = join(
            process.cwd(),
            "public",
            "example-sentences",
            "speaking",
        );
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(join(dir, filename), Buffer.from(res.data));
        return `/example-sentences/speaking/${filename}`;
    }

    async create(
        user: User,
        dto: Partial<ExampleSentence>,
        options?: any,
    ): Promise<ExampleSentence> {
        const created = await super.create(user, dto, options);
        if (created.audio_url || !created.sentence_en?.trim()) {
            return created;
        }

        const audioUrl = await this.generateAndSaveTtsAudio({
            sentenceId: created._id,
            text: created.sentence_en,
        });
        const updated = await this.exampleSentenceRepository.updateById(
            created._id,
            { audio_url: audioUrl } as any,
        );
        return updated ?? created;
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<ExampleSentence>,
    ): Promise<ExampleSentence[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<ExampleSentence>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
