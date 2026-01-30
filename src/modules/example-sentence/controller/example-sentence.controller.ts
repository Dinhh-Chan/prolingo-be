import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ExampleSentenceService } from "../services/example-sentence.service";
import { ExampleSentence } from "../entities/example-sentence.entity";
import { CreateExampleSentenceDto } from "../dto/create-example-sentence.dto";
import { UpdateExampleSentenceDto } from "../dto/update-example-sentence.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionExampleSentenceDto } from "../dto/condition-example-sentence.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("example-sentences")
@ApiTags("ExampleSentence")
export class ExampleSentenceController extends BaseControllerFactory<ExampleSentence>(
    ExampleSentence,
    ConditionExampleSentenceDto,
    CreateExampleSentenceDto,
    UpdateExampleSentenceDto,
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
        private readonly exampleSentenceService: ExampleSentenceService,
    ) {
        super(exampleSentenceService);
    }
}
