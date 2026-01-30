import { InjectModel } from "@nestjs/sequelize";
import { LessonModel } from "../models/lesson.model";
import { Lesson } from "../entities/lesson.entity";
import { LessonRepository } from "./lesson-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class LessonRepositorySql
    extends SqlRepository<Lesson>
    implements LessonRepository
{
    constructor(
        @InjectModel(LessonModel)
        private readonly lessonModel: typeof LessonModel,
    ) {
        super(lessonModel);
    }
}
