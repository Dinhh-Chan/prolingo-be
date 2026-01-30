import { InjectModel } from "@nestjs/sequelize";
import { ReadingContentModel } from "../models/reading-content.model";
import { ReadingContent } from "../entities/reading-content.entity";
import { ReadingContentRepository } from "./reading-content-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ReadingContentRepositorySql
    extends SqlRepository<ReadingContent>
    implements ReadingContentRepository
{
    constructor(
        @InjectModel(ReadingContentModel)
        private readonly readingContentModel: typeof ReadingContentModel,
    ) {
        super(readingContentModel);
    }
}
