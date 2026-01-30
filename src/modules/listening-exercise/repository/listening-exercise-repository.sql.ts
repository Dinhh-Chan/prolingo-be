import { InjectModel } from "@nestjs/sequelize";
import { ListeningExerciseModel } from "../models/listening-exercise.model";
import { ListeningExercise } from "../entities/listening-exercise.entity";
import { ListeningExerciseRepository } from "./listening-exercise-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ListeningExerciseRepositorySql
    extends SqlRepository<ListeningExercise>
    implements ListeningExerciseRepository
{
    constructor(
        @InjectModel(ListeningExerciseModel)
        private readonly listeningExerciseModel: typeof ListeningExerciseModel,
    ) {
        super(listeningExerciseModel);
    }
}
