import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { UserSpeakingAttemptController } from "./controller/user-speaking-attempt.controller";
import { UserSpeakingAttemptModel } from "./models/user-speaking-attempt.model";
import { UserSpeakingAttemptRepositorySql } from "./repository/user-speaking-attempt-repository.sql";
import { UserSpeakingAttemptService } from "./services/user-speaking-attempt.service";

@Module({
    imports: [SequelizeModule.forFeature([UserSpeakingAttemptModel])],
    controllers: [UserSpeakingAttemptController],
    providers: [
        UserSpeakingAttemptService,
        RepositoryProvider(
            Entity.USER_SPEAKING_ATTEMPT,
            UserSpeakingAttemptRepositorySql,
        ),
    ],
    exports: [UserSpeakingAttemptService],
})
export class UserSpeakingAttemptModule {}
