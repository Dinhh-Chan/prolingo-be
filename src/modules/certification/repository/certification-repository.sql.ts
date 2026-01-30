import { InjectModel } from "@nestjs/sequelize";
import { CertificationModel } from "../models/certification.model";
import { Certification } from "../entities/certification.entity";
import { CertificationRepository } from "./certification-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class CertificationRepositorySql
    extends SqlRepository<Certification>
    implements CertificationRepository
{
    constructor(
        @InjectModel(CertificationModel)
        private readonly certificationModel: typeof CertificationModel,
    ) {
        super(certificationModel);
    }
}
