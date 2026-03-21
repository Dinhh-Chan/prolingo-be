import { InjectModel } from "@nestjs/sequelize";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { Survey } from "../entities/survey.entity";
import { SurveyModel } from "../models/survey.model";
import { SurveyRepository } from "./survey-repository.interface";

export class SurveyRepositorySql
    extends SqlRepository<Survey>
    implements SurveyRepository
{
    constructor(
        @InjectModel(SurveyModel)
        private readonly surveyModel: typeof SurveyModel,
    ) {
        super(surveyModel);
    }
}
