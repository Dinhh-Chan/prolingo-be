import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { SpeakingScenario } from "../entities/speaking-scenario.entity";
import { SpeakingScenarioRepository } from "../repository/speaking-scenario-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class SpeakingScenarioService extends BaseService<
    SpeakingScenario,
    SpeakingScenarioRepository
> {
    constructor(
        @InjectRepository(Entity.SPEAKING_SCENARIO)
        private readonly speakingScenarioRepository: SpeakingScenarioRepository,
    ) {
        super(speakingScenarioRepository, {
            notFoundCode: "error-speaking-scenario-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<SpeakingScenario>,
    ): Promise<SpeakingScenario[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<SpeakingScenario>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
