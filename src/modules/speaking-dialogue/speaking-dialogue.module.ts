import { SpeakingDialogueController } from "./controller/speaking-dialogue.controller";
import { SpeakingDialogueService } from "./services/speaking-dialogue.service";
import { SpeakingDialogueModel } from "./models/speaking-dialogue.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { SpeakingDialogueRepositorySql } from "./repository/speaking-dialogue-repository.sql";
import { SpeakingScenarioModule } from "../speaking-scenario/speaking-scenario.module";

@Module({
    imports: [
        SequelizeModule.forFeature([SpeakingDialogueModel]),
        SpeakingScenarioModule,
    ],
    controllers: [SpeakingDialogueController],
    providers: [
        SpeakingDialogueService,
        RepositoryProvider(
            Entity.SPEAKING_DIALOGUE,
            SpeakingDialogueRepositorySql,
        ),
    ],
    exports: [SpeakingDialogueService],
})
export class SpeakingDialogueModule {}
