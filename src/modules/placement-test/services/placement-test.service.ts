import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { PlacementTest } from "../entities/placement-test.entity";
import { PlacementTestRepository } from "../repository/placement-test-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class PlacementTestService extends BaseService<
    PlacementTest,
    PlacementTestRepository
> {
    constructor(
        @InjectRepository(Entity.PLACEMENT_TEST)
        private readonly placementTestRepository: PlacementTestRepository,
    ) {
        super(placementTestRepository, {
            notFoundCode: "error-placement-test-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<PlacementTest>,
    ): Promise<PlacementTest[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<PlacementTest>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
