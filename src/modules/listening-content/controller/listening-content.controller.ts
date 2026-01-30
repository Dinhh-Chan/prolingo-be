import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ListeningContentService } from "../services/listening-content.service";
import { ListeningContent } from "../entities/listening-content.entity";
import { CreateListeningContentDto } from "../dto/create-listening-content.dto";
import { UpdateListeningContentDto } from "../dto/update-listening-content.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionListeningContentDto } from "../dto/condition-listening-content.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("listening-contents")
@ApiTags("ListeningContent")
export class ListeningContentController extends BaseControllerFactory<ListeningContent>(
    ListeningContent,
    ConditionListeningContentDto,
    CreateListeningContentDto,
    UpdateListeningContentDto,
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
        private readonly listeningContentService: ListeningContentService,
    ) {
        super(listeningContentService);
    }
}
