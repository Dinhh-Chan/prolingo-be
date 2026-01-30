import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { WritingTemplate } from "../entities/writing-template.entity";

export interface WritingTemplateRepository
    extends BaseRepository<WritingTemplate> {}
