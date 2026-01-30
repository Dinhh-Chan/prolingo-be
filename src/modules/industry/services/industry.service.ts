import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { Industry } from "../entities/industry.entity";
import { IndustryRepository } from "../repository/industry-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class IndustryService extends BaseService<Industry, IndustryRepository> {
    constructor(
        @InjectRepository(Entity.INDUSTRY)
        private readonly industryRepository: IndustryRepository,
    ) {
        super(industryRepository, {
            notFoundCode: "error-industry-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<Industry>,
    ): Promise<Industry[]> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name_vi: 1 },
        };

        return super.getMany(user, conditions, queryWithDefaultSort);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<Industry>,
    ): Promise<any> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name_vi: 1 },
        };
        return super.getPage(user, conditions, queryWithDefaultSort);
    }
}
