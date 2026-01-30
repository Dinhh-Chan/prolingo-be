import { InjectModel } from "@nestjs/sequelize";
import { ListeningContentModel } from "../models/listening-content.model";
import { ListeningContent } from "../entities/listening-content.entity";
import { ListeningContentRepository } from "./listening-content-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ListeningContentRepositorySql
    extends SqlRepository<ListeningContent>
    implements ListeningContentRepository
{
    constructor(
        @InjectModel(ListeningContentModel)
        private readonly listeningContentModel: typeof ListeningContentModel,
    ) {
        super(listeningContentModel);
    }
}
