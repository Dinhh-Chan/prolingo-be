import { InjectModel } from "@nestjs/sequelize";
import { LearningModuleModel } from "../models/learning-module.model";
import { LearningModule } from "../entities/learning-module.entity";
import { LearningModuleRepository } from "./learning-module-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class LearningModuleRepositorySql
    extends SqlRepository<LearningModule>
    implements LearningModuleRepository
{
    constructor(
        @InjectModel(LearningModuleModel)
        private readonly learningModuleModel: typeof LearningModuleModel,
    ) {
        super(learningModuleModel);
    }
}
