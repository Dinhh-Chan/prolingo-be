import { ConceptCertificationController } from "./controller/concept-certification.controller";
import { ConceptCertificationService } from "./services/concept-certification.service";
import { ConceptCertificationModel } from "./models/concept-certification.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConceptCertificationRepositorySql } from "./repository/concept-certification-repository.sql";
import { ConceptModule } from "../concept/concept.module";
import { CertificationModule } from "../certification/certification.module";

@Module({
    imports: [
        SequelizeModule.forFeature([ConceptCertificationModel]),
        ConceptModule,
        CertificationModule,
    ],
    controllers: [ConceptCertificationController],
    providers: [
        ConceptCertificationService,
        RepositoryProvider(
            Entity.CONCEPT_CERTIFICATION,
            ConceptCertificationRepositorySql,
        ),
    ],
    exports: [ConceptCertificationService],
})
export class ConceptCertificationModule {}
