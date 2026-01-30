import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { WritingExercise } from "../entities/writing-exercise.entity";

export interface WritingExerciseRepository
    extends BaseRepository<WritingExercise> {}
