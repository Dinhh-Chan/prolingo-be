import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { IndustryService } from "../services/industry.service";
import { Industry } from "../entities/industry.entity";
import { CreateIndustryDto } from "../dto/create-industry.dto";
import { UpdateIndustryDto } from "../dto/update-industry.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionIndustryDto } from "../dto/condition-industry.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("industries")
@ApiTags("Industry")
export class IndustryController extends BaseControllerFactory<Industry>(
    Industry,
    ConditionIndustryDto,
    CreateIndustryDto,
    UpdateIndustryDto,
    {
        authorize: true,
        routes: {
            getMany: {
                enable: false, // Disable để tránh xung đột với route custom
            },
            getById: {
                roles: [SystemRole.ADMIN],
            },
        },
    },
) {
    constructor(private readonly industryService: IndustryService) {
        super(industryService);
    }
}
