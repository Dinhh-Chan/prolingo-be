import { InjectModel } from "@nestjs/sequelize";
import { SpeakingExerciseModel } from "../models/speaking-exercise.model";
import { SpeakingExercise } from "../entities/speaking-exercise.entity";
import { SpeakingExerciseRepository } from "./speaking-exercise-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class SpeakingExerciseRepositorySql
    extends SqlRepository<SpeakingExercise>
    implements SpeakingExerciseRepository
{
    constructor(
        @InjectModel(SpeakingExerciseModel)
        private readonly speakingExerciseModel: typeof SpeakingExerciseModel,
    ) {
        super(speakingExerciseModel);
    }
}
