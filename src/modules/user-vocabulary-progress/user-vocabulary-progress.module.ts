import { UserVocabularyProgressController } from "./controller/user-vocabulary-progress.controller";
import { UserVocabularyProgressService } from "./services/user-vocabulary-progress.service";
import { UserVocabularyProgressModel } from "./models/user-vocabulary-progress.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserVocabularyProgressRepositorySql } from "./repository/user-vocabulary-progress-repository.sql";
import { VocabularyModule } from "../vocabulary/vocabulary.module";
import { LessonVocabularyModel } from "../lesson-vocabulary/models/lesson-vocabulary.model";

@Module({
    imports: [
        SequelizeModule.forFeature([
            UserVocabularyProgressModel,
            LessonVocabularyModel,
        ]),
        VocabularyModule,
    ],
    controllers: [UserVocabularyProgressController],
    providers: [
        UserVocabularyProgressService,
        RepositoryProvider(
            Entity.USER_VOCABULARY_PROGRESS,
            UserVocabularyProgressRepositorySql,
        ),
    ],
    exports: [UserVocabularyProgressService],
})
export class UserVocabularyProgressModule {}
