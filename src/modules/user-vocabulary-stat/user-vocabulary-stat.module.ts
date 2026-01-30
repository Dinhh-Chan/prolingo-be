import { UserVocabularyStatController } from "./controller/user-vocabulary-stat.controller";
import { UserVocabularyStatService } from "./services/user-vocabulary-stat.service";
import { UserVocabularyStatModel } from "./models/user-vocabulary-stat.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserVocabularyStatRepositorySql } from "./repository/user-vocabulary-stat-repository.sql";
import { UserModule } from "../user/user.module";
import { IndustryModule } from "../industry/industry.module";
import { CertificationModule } from "../certification/certification.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UserVocabularyStatModel]),
        UserModule,
        IndustryModule,
        CertificationModule,
    ],
    controllers: [UserVocabularyStatController],
    providers: [
        UserVocabularyStatService,
        RepositoryProvider(
            Entity.USER_VOCABULARY_STAT,
            UserVocabularyStatRepositorySql,
        ),
    ],
    exports: [UserVocabularyStatService],
})
export class UserVocabularyStatModule {}
