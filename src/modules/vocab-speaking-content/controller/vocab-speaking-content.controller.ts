import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { SystemRole } from "@module/user/common/constant";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionVocabSpeakingContentDto } from "../dto/condition-vocab-speaking-content.dto";
import { CreateVocabSpeakingContentDto } from "../dto/create-vocab-speaking-content.dto";
import { UpdateVocabSpeakingContentDto } from "../dto/update-vocab-speaking-content.dto";
import { VocabSpeakingContent } from "../entities/vocab-speaking-content.entity";
import { VocabSpeakingContentService } from "../services/vocab-speaking-content.service";

@Controller("vocab-speaking-contents")
@ApiTags("VocabSpeakingContent")
export class VocabSpeakingContentController extends BaseControllerFactory<VocabSpeakingContent>(
    VocabSpeakingContent,
    ConditionVocabSpeakingContentDto,
    CreateVocabSpeakingContentDto,
    UpdateVocabSpeakingContentDto,
    {
        authorize: true,
        routes: {
            getMany: {
                enable: false,
            },
            create: {
                roles: [SystemRole.ADMIN],
            },
            updateById: {
                roles: [SystemRole.ADMIN],
            },
            deleteById: {
                roles: [SystemRole.ADMIN],
            },
            getById: {
                roles: [SystemRole.ADMIN, SystemRole.USER],
            },
        },
    },
) {
    constructor(
        private readonly vocabSpeakingContentService: VocabSpeakingContentService,
    ) {
        super(vocabSpeakingContentService);
    }
}
