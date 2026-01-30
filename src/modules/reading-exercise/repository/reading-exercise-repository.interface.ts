import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { ReadingExercise } from "../entities/reading-exercise.entity";

export interface ReadingExerciseRepository
    extends BaseRepository<ReadingExercise> {}
