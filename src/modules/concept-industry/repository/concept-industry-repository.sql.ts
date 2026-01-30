import { InjectModel } from "@nestjs/sequelize";
import { ConceptIndustryModel } from "../models/concept-industry.model";
import { ConceptIndustry } from "../entities/concept-industry.entity";
import { ConceptIndustryRepository } from "./concept-industry-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ConceptIndustryRepositorySql
    extends SqlRepository<ConceptIndustry>
    implements ConceptIndustryRepository
{
    constructor(
        @InjectModel(ConceptIndustryModel)
        private readonly conceptIndustryModel: typeof ConceptIndustryModel,
    ) {
        super(conceptIndustryModel);
    }
}
