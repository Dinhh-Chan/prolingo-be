import { SpeakingScenarioController } from "./controller/speaking-scenario.controller";
import { SpeakingScenarioService } from "./services/speaking-scenario.service";
import { SpeakingScenarioModel } from "./models/speaking-scenario.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { SpeakingScenarioRepositorySql } from "./repository/speaking-scenario-repository.sql";
import { IndustryModule } from "../industry/industry.module";

@Module({
    imports: [
        SequelizeModule.forFeature([SpeakingScenarioModel]),
        IndustryModule,
    ],
    controllers: [SpeakingScenarioController],
    providers: [
        SpeakingScenarioService,
        RepositoryProvider(
            Entity.SPEAKING_SCENARIO,
            SpeakingScenarioRepositorySql,
        ),
    ],
    exports: [SpeakingScenarioService],
})
export class SpeakingScenarioModule {}
