import { InjectModel } from "@nestjs/sequelize";
import { SpeakingScenarioModel } from "../models/speaking-scenario.model";
import { SpeakingScenario } from "../entities/speaking-scenario.entity";
import { SpeakingScenarioRepository } from "./speaking-scenario-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class SpeakingScenarioRepositorySql
    extends SqlRepository<SpeakingScenario>
    implements SpeakingScenarioRepository
{
    constructor(
        @InjectModel(SpeakingScenarioModel)
        private readonly speakingScenarioModel: typeof SpeakingScenarioModel,
    ) {
        super(speakingScenarioModel);
    }
}
