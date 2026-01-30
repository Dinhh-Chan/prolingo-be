import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ConceptVocabularyService } from "../services/concept-vocabulary.service";
import { ConceptVocabulary } from "../entities/concept-vocabulary.entity";
import { CreateConceptVocabularyDto } from "../dto/create-concept-vocabulary.dto";
import { UpdateConceptVocabularyDto } from "../dto/update-concept-vocabulary.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionConceptVocabularyDto } from "../dto/condition-concept-vocabulary.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("concept-vocabulary")
@ApiTags("ConceptVocabulary")
export class ConceptVocabularyController extends BaseControllerFactory<ConceptVocabulary>(
    ConceptVocabulary,
    ConditionConceptVocabularyDto,
    CreateConceptVocabularyDto,
    UpdateConceptVocabularyDto,
    {
        authorize: true,
        routes: {
            getMany: {
                enable: false,
            },
            getById: {
                roles: [SystemRole.ADMIN],
            },
        },
    },
) {
    constructor(
        private readonly conceptVocabularyService: ConceptVocabularyService,
    ) {
        super(conceptVocabularyService);
    }
}
