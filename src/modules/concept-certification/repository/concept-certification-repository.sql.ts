import { InjectModel } from "@nestjs/sequelize";
import { ConceptCertificationModel } from "../models/concept-certification.model";
import { ConceptCertification } from "../entities/concept-certification.entity";
import { ConceptCertificationRepository } from "./concept-certification-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ConceptCertificationRepositorySql
    extends SqlRepository<ConceptCertification>
    implements ConceptCertificationRepository
{
    constructor(
        @InjectModel(ConceptCertificationModel)
        private readonly conceptCertificationModel: typeof ConceptCertificationModel,
    ) {
        super(conceptCertificationModel);
    }
}
