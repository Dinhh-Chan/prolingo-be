import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ConceptIndustryService } from "../services/concept-industry.service";
import { ConceptIndustry } from "../entities/concept-industry.entity";
import { CreateConceptIndustryDto } from "../dto/create-concept-industry.dto";
import { UpdateConceptIndustryDto } from "../dto/update-concept-industry.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionConceptIndustryDto } from "../dto/condition-concept-industry.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("concept-industries")
@ApiTags("ConceptIndustry")
export class ConceptIndustryController extends BaseControllerFactory<ConceptIndustry>(
    ConceptIndustry,
    ConditionConceptIndustryDto,
    CreateConceptIndustryDto,
    UpdateConceptIndustryDto,
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
        private readonly conceptIndustryService: ConceptIndustryService,
    ) {
        super(conceptIndustryService);
    }
}
