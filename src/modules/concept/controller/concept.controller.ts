import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ConceptService } from "../services/concept.service";
import { Concept } from "../entities/concept.entity";
import { CreateConceptDto } from "../dto/create-concept.dto";
import { UpdateConceptDto } from "../dto/update-concept.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionConceptDto } from "../dto/condition-concept.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("concepts")
@ApiTags("Concept")
export class ConceptController extends BaseControllerFactory<Concept>(
    Concept,
    ConditionConceptDto,
    CreateConceptDto,
    UpdateConceptDto,
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
    constructor(private readonly conceptService: ConceptService) {
        super(conceptService);
    }
}
