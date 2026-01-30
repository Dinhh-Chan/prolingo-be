import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ConceptCertification } from "../entities/concept-certification.entity";
import { ConceptCertificationRepository } from "../repository/concept-certification-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ConceptCertificationService extends BaseService<
    ConceptCertification,
    ConceptCertificationRepository
> {
    constructor(
        @InjectRepository(Entity.CONCEPT_CERTIFICATION)
        private readonly conceptCertificationRepository: ConceptCertificationRepository,
    ) {
        super(conceptCertificationRepository, {
            notFoundCode: "error-concept-certification-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<ConceptCertification>,
    ): Promise<ConceptCertification[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<ConceptCertification>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
