import { InjectModel } from "@nestjs/sequelize";
import { ExampleSentenceModel } from "../models/example-sentence.model";
import { ExampleSentence } from "../entities/example-sentence.entity";
import { ExampleSentenceRepository } from "./example-sentence-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ExampleSentenceRepositorySql
    extends SqlRepository<ExampleSentence>
    implements ExampleSentenceRepository
{
    constructor(
        @InjectModel(ExampleSentenceModel)
        private readonly exampleSentenceModel: typeof ExampleSentenceModel,
    ) {
        super(exampleSentenceModel);
    }
}
