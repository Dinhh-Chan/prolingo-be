import { IndustryController } from "./controller/industry.controller";
import { IndustryService } from "./services/industry.service";
import { IndustryModel } from "./models/industry.model";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { IndustryRepositorySql } from "./repository/industry-repository.sql";

@Module({
    imports: [SequelizeModule.forFeature([IndustryModel])],
    controllers: [IndustryController],
    providers: [
        IndustryService,
        RepositoryProvider(Entity.INDUSTRY, IndustryRepositorySql),
    ],
    exports: [IndustryService],
})
export class IndustryModule {}
