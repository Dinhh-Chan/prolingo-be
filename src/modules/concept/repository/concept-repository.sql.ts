import { InjectModel } from "@nestjs/sequelize";
import { ConceptModel } from "../models/concept.model";
import { Concept } from "../entities/concept.entity";
import { ConceptRepository } from "./concept-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ConceptRepositorySql
    extends SqlRepository<Concept>
    implements ConceptRepository
{
    constructor(
        @InjectModel(ConceptModel)
        private readonly conceptModel: typeof ConceptModel,
    ) {
        super(conceptModel);
    }
}
