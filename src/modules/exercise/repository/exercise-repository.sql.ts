import { InjectModel } from "@nestjs/sequelize";
import { ExerciseModel } from "../models/exercise.model";
import { Exercise } from "../entities/exercise.entity";
import { ExerciseRepository } from "./exercise-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ExerciseRepositorySql
    extends SqlRepository<Exercise>
    implements ExerciseRepository
{
    constructor(
        @InjectModel(ExerciseModel)
        private readonly exerciseModel: typeof ExerciseModel,
    ) {
        super(exerciseModel);
    }
}
