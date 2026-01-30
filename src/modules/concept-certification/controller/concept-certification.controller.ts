import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ConceptCertificationService } from "../services/concept-certification.service";
import { ConceptCertification } from "../entities/concept-certification.entity";
import { CreateConceptCertificationDto } from "../dto/create-concept-certification.dto";
import { UpdateConceptCertificationDto } from "../dto/update-concept-certification.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionConceptCertificationDto } from "../dto/condition-concept-certification.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("concept-certifications")
@ApiTags("ConceptCertification")
export class ConceptCertificationController extends BaseControllerFactory<ConceptCertification>(
    ConceptCertification,
    ConditionConceptCertificationDto,
    CreateConceptCertificationDto,
    UpdateConceptCertificationDto,
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
        private readonly conceptCertificationService: ConceptCertificationService,
    ) {
        super(conceptCertificationService);
    }
}
