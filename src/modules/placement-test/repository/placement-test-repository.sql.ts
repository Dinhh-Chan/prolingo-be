import { InjectModel } from "@nestjs/sequelize";
import { PlacementTestModel } from "../models/placement-test.model";
import { PlacementTest } from "../entities/placement-test.entity";
import { PlacementTestRepository } from "./placement-test-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class PlacementTestRepositorySql
    extends SqlRepository<PlacementTest>
    implements PlacementTestRepository
{
    constructor(
        @InjectModel(PlacementTestModel)
        private readonly placementTestModel: typeof PlacementTestModel,
    ) {
        super(placementTestModel);
    }
}
