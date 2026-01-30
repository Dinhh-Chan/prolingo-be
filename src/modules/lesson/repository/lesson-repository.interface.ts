import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { Lesson } from "../entities/lesson.entity";

export interface LessonRepository extends BaseRepository<Lesson> {}
