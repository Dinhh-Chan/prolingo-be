import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { Certification } from "../entities/certification.entity";

export interface CertificationRepository
    extends BaseRepository<Certification> {}
