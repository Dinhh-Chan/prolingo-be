import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { SpeakingDialogue } from "../entities/speaking-dialogue.entity";
import { SpeakingDialogueRepository } from "../repository/speaking-dialogue-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class SpeakingDialogueService extends BaseService<
    SpeakingDialogue,
    SpeakingDialogueRepository
> {
    constructor(
        @InjectRepository(Entity.SPEAKING_DIALOGUE)
        private readonly speakingDialogueRepository: SpeakingDialogueRepository,
    ) {
        super(speakingDialogueRepository, {
            notFoundCode: "error-speaking-dialogue-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<SpeakingDialogue>,
    ): Promise<SpeakingDialogue[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<SpeakingDialogue>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
