import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ReadingContentService } from "../services/reading-content.service";
import { ReadingContent } from "../entities/reading-content.entity";
import { CreateReadingContentDto } from "../dto/create-reading-content.dto";
import { UpdateReadingContentDto } from "../dto/update-reading-content.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionReadingContentDto } from "../dto/condition-reading-content.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("reading-contents")
@ApiTags("ReadingContent")
export class ReadingContentController extends BaseControllerFactory<ReadingContent>(
    ReadingContent,
    ConditionReadingContentDto,
    CreateReadingContentDto,
    UpdateReadingContentDto,
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
    constructor(private readonly readingContentService: ReadingContentService) {
        super(readingContentService);
    }
}
