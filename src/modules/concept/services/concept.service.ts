import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { Concept } from "../entities/concept.entity";
import { ConceptRepository } from "../repository/concept-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ConceptService extends BaseService<Concept, ConceptRepository> {
    constructor(
        @InjectRepository(Entity.CONCEPT)
        private readonly conceptRepository: ConceptRepository,
    ) {
        super(conceptRepository, {
            notFoundCode: "error-concept-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<Concept>,
    ): Promise<Concept[]> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name_en: 1 },
        };

        return super.getMany(user, conditions, queryWithDefaultSort);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<Concept>,
    ): Promise<any> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name_en: 1 },
        };
        return super.getPage(user, conditions, queryWithDefaultSort);
    }
}
