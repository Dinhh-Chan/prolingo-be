import { InjectModel } from "@nestjs/sequelize";
import { LessonExerciseModel } from "../models/lesson-exercise.model";
import { LessonExercise } from "../entities/lesson-exercise.entity";
import { LessonExerciseRepository } from "./lesson-exercise-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class LessonExerciseRepositorySql
    extends SqlRepository<LessonExercise>
    implements LessonExerciseRepository
{
    constructor(
        @InjectModel(LessonExerciseModel)
        private readonly lessonExerciseModel: typeof LessonExerciseModel,
    ) {
        super(lessonExerciseModel);
    }
}
