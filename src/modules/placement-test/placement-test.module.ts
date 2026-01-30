import { PlacementTestController } from "./controller/placement-test.controller";
import { PlacementTestService } from "./services/placement-test.service";
import { PlacementTestModel } from "./models/placement-test.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { PlacementTestRepositorySql } from "./repository/placement-test-repository.sql";
import { UserModule } from "../user/user.module";

@Module({
    imports: [SequelizeModule.forFeature([PlacementTestModel]), UserModule],
    controllers: [PlacementTestController],
    providers: [
        PlacementTestService,
        RepositoryProvider(Entity.PLACEMENT_TEST, PlacementTestRepositorySql),
    ],
    exports: [PlacementTestService],
})
export class PlacementTestModule {}
