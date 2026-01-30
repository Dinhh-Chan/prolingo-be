import { InjectModel } from "@nestjs/sequelize";
import { IndustryModel } from "../models/industry.model";
import { Industry } from "../entities/industry.entity";
import { IndustryRepository } from "./industry-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class IndustryRepositorySql
    extends SqlRepository<Industry>
    implements IndustryRepository
{
    constructor(
        @InjectModel(IndustryModel)
        private readonly industryModel: typeof IndustryModel,
    ) {
        super(industryModel);
    }
}
