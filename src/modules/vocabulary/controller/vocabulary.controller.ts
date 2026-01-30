import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { VocabularyService } from "../services/vocabulary.service";
import { Vocabulary } from "../entities/vocabulary.entity";
import { CreateVocabularyDto } from "../dto/create-vocabulary.dto";
import { UpdateVocabularyDto } from "../dto/update-vocabulary.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionVocabularyDto } from "../dto/condition-vocabulary.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("vocabulary")
@ApiTags("Vocabulary")
export class VocabularyController extends BaseControllerFactory<Vocabulary>(
    Vocabulary,
    ConditionVocabularyDto,
    CreateVocabularyDto,
    UpdateVocabularyDto,
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
    constructor(private readonly vocabularyService: VocabularyService) {
        super(vocabularyService);
    }
}
