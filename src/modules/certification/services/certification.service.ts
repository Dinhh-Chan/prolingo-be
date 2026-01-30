import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { Certification } from "../entities/certification.entity";
import { CertificationRepository } from "../repository/certification-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class CertificationService extends BaseService<
    Certification,
    CertificationRepository
> {
    constructor(
        @InjectRepository(Entity.CERTIFICATION)
        private readonly certificationRepository: CertificationRepository,
    ) {
        super(certificationRepository, {
            notFoundCode: "error-certification-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<Certification>,
    ): Promise<Certification[]> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name: 1 },
        };

        return super.getMany(user, conditions, queryWithDefaultSort);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<Certification>,
    ): Promise<any> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name: 1 },
        };
        return super.getPage(user, conditions, queryWithDefaultSort);
    }
}
