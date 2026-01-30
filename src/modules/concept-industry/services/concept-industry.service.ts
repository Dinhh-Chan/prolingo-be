import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ConceptIndustry } from "../entities/concept-industry.entity";
import { ConceptIndustryRepository } from "../repository/concept-industry-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ConceptIndustryService extends BaseService<
    ConceptIndustry,
    ConceptIndustryRepository
> {
    constructor(
        @InjectRepository(Entity.CONCEPT_INDUSTRY)
        private readonly conceptIndustryRepository: ConceptIndustryRepository,
    ) {
        super(conceptIndustryRepository, {
            notFoundCode: "error-concept-industry-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<ConceptIndustry>,
    ): Promise<ConceptIndustry[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<ConceptIndustry>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
