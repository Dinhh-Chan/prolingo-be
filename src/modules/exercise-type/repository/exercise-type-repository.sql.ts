import { InjectModel } from "@nestjs/sequelize";
import { ExerciseTypeModel } from "../models/exercise-type.model";
import { ExerciseType } from "../entities/exercise-type.entity";
import { ExerciseTypeRepository } from "./exercise-type-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ExerciseTypeRepositorySql
    extends SqlRepository<ExerciseType>
    implements ExerciseTypeRepository
{
    constructor(
        @InjectModel(ExerciseTypeModel)
        private readonly exerciseTypeModel: typeof ExerciseTypeModel,
    ) {
        super(exerciseTypeModel);
    }
}
