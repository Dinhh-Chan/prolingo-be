import { InjectModel } from "@nestjs/sequelize";
import { WritingTemplateModel } from "../models/writing-template.model";
import { WritingTemplate } from "../entities/writing-template.entity";
import { WritingTemplateRepository } from "./writing-template-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class WritingTemplateRepositorySql
    extends SqlRepository<WritingTemplate>
    implements WritingTemplateRepository
{
    constructor(
        @InjectModel(WritingTemplateModel)
        private readonly writingTemplateModel: typeof WritingTemplateModel,
    ) {
        super(writingTemplateModel);
    }
}
