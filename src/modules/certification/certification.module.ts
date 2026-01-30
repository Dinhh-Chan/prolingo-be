import { CertificationController } from "./controller/certification.controller";
import { CertificationService } from "./services/certification.service";
import { CertificationModel } from "./models/certification.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { CertificationRepositorySql } from "./repository/certification-repository.sql";

@Module({
    imports: [SequelizeModule.forFeature([CertificationModel])],
    controllers: [CertificationController],
    providers: [
        CertificationService,
        RepositoryProvider(Entity.CERTIFICATION, CertificationRepositorySql),
    ],
    exports: [CertificationService],
})
export class CertificationModule {}
