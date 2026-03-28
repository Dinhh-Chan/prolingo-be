import { InjectModel } from "@nestjs/sequelize";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { VocabSpeakingContent } from "../entities/vocab-speaking-content.entity";
import { VocabSpeakingContentModel } from "../models/vocab-speaking-content.model";
import { VocabSpeakingContentRepository } from "./vocab-speaking-content-repository.interface";

export class VocabSpeakingContentRepositorySql
    extends SqlRepository<VocabSpeakingContent>
    implements VocabSpeakingContentRepository
{
    constructor(
        @InjectModel(VocabSpeakingContentModel)
        private readonly vocabSpeakingContentModel: typeof VocabSpeakingContentModel,
    ) {
        super(vocabSpeakingContentModel);
    }
}
