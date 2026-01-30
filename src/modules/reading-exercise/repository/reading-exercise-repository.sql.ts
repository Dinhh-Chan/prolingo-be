import { InjectModel } from "@nestjs/sequelize";
import { ReadingExerciseModel } from "../models/reading-exercise.model";
import { ReadingExercise } from "../entities/reading-exercise.entity";
import { ReadingExerciseRepository } from "./reading-exercise-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ReadingExerciseRepositorySql
    extends SqlRepository<ReadingExercise>
    implements ReadingExerciseRepository
{
    constructor(
        @InjectModel(ReadingExerciseModel)
        private readonly readingExerciseModel: typeof ReadingExerciseModel,
    ) {
        super(readingExerciseModel);
    }
}
