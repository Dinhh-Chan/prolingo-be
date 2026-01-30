import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { LessonExercise } from "../entities/lesson-exercise.entity";

export interface LessonExerciseRepository
    extends BaseRepository<LessonExercise> {}
