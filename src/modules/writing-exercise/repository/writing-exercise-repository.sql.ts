import { InjectModel } from "@nestjs/sequelize";
import { WritingExerciseModel } from "../models/writing-exercise.model";
import { WritingExercise } from "../entities/writing-exercise.entity";
import { WritingExerciseRepository } from "./writing-exercise-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class WritingExerciseRepositorySql
    extends SqlRepository<WritingExercise>
    implements WritingExerciseRepository
{
    constructor(
        @InjectModel(WritingExerciseModel)
        private readonly writingExerciseModel: typeof WritingExerciseModel,
    ) {
        super(writingExerciseModel);
    }
}
