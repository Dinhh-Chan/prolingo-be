import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { CertificationService } from "../services/certification.service";
import { Certification } from "../entities/certification.entity";
import { CreateCertificationDto } from "../dto/create-certification.dto";
import { UpdateCertificationDto } from "../dto/update-certification.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionCertificationDto } from "../dto/condition-certification.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("certifications")
@ApiTags("Certification")
export class CertificationController extends BaseControllerFactory<Certification>(
    Certification,
    ConditionCertificationDto,
    CreateCertificationDto,
    UpdateCertificationDto,
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
    constructor(private readonly certificationService: CertificationService) {
        super(certificationService);
    }
}
