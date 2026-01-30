import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { WritingTemplateService } from "../services/writing-template.service";
import { WritingTemplate } from "../entities/writing-template.entity";
import { CreateWritingTemplateDto } from "../dto/create-writing-template.dto";
import { UpdateWritingTemplateDto } from "../dto/update-writing-template.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionWritingTemplateDto } from "../dto/condition-writing-template.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("writing-templates")
@ApiTags("WritingTemplate")
export class WritingTemplateController extends BaseControllerFactory<WritingTemplate>(
    WritingTemplate,
    ConditionWritingTemplateDto,
    CreateWritingTemplateDto,
    UpdateWritingTemplateDto,
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
        private readonly writingTemplateService: WritingTemplateService,
    ) {
        super(writingTemplateService);
    }
}
