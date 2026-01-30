import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { ConceptCertification } from "../entities/concept-certification.entity";

export interface ConceptCertificationRepository
    extends BaseRepository<ConceptCertification> {}
