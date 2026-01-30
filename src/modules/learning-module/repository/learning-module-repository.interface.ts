import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { LearningModule } from "../entities/learning-module.entity";

export interface LearningModuleRepository
    extends BaseRepository<LearningModule> {}
