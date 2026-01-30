import { InjectModel } from "@nestjs/sequelize";
import { LearningPathModel } from "../models/learning-path.model";
import { LearningPath } from "../entities/learning-path.entity";
import { LearningPathRepository } from "./learning-path-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class LearningPathRepositorySql
    extends SqlRepository<LearningPath>
    implements LearningPathRepository
{
    constructor(
        @InjectModel(LearningPathModel)
        private readonly learningPathModel: typeof LearningPathModel,
    ) {
        super(learningPathModel);
    }
}
