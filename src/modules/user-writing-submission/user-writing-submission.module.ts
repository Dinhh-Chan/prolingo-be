import { UserWritingSubmissionController } from "./controller/user-writing-submission.controller";
import { UserWritingSubmissionService } from "./services/user-writing-submission.service";
import { UserWritingSubmissionModel } from "./models/user-writing-submission.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserWritingSubmissionRepositorySql } from "./repository/user-writing-submission-repository.sql";
import { UserModule } from "../user/user.module";
import { WritingExerciseModule } from "../writing-exercise/writing-exercise.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UserWritingSubmissionModel]),
        UserModule,
        WritingExerciseModule,
    ],
    controllers: [UserWritingSubmissionController],
    providers: [
        UserWritingSubmissionService,
        RepositoryProvider(
            Entity.USER_WRITING_SUBMISSION,
            UserWritingSubmissionRepositorySql,
        ),
    ],
    exports: [UserWritingSubmissionService],
})
export class UserWritingSubmissionModule {}
