import { UserSpeakingSubmissionController } from "./controller/user-speaking-submission.controller";
import { UserSpeakingSubmissionService } from "./services/user-speaking-submission.service";
import { UserSpeakingSubmissionModel } from "./models/user-speaking-submission.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserSpeakingSubmissionRepositorySql } from "./repository/user-speaking-submission-repository.sql";
import { UserModule } from "../user/user.module";
import { SpeakingExerciseModule } from "../speaking-exercise/speaking-exercise.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UserSpeakingSubmissionModel]),
        UserModule,
        SpeakingExerciseModule,
    ],
    controllers: [UserSpeakingSubmissionController],
    providers: [
        UserSpeakingSubmissionService,
        RepositoryProvider(
            Entity.USER_SPEAKING_SUBMISSION,
            UserSpeakingSubmissionRepositorySql,
        ),
    ],
    exports: [UserSpeakingSubmissionService],
})
export class UserSpeakingSubmissionModule {}
