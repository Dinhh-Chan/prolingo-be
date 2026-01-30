import { InjectModel } from "@nestjs/sequelize";
import { ExerciseIndustryModel } from "../models/exercise-industry.model";
import { ExerciseIndustry } from "../entities/exercise-industry.entity";
import { ExerciseIndustryRepository } from "./exercise-industry-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ExerciseIndustryRepositorySql
    extends SqlRepository<ExerciseIndustry>
    implements ExerciseIndustryRepository
{
    constructor(
        @InjectModel(ExerciseIndustryModel)
        private readonly exerciseIndustryModel: typeof ExerciseIndustryModel,
    ) {
        super(exerciseIndustryModel);
    }
}
