import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserWritingSubmissionService } from "../services/user-writing-submission.service";
import { UserWritingSubmission } from "../entities/user-writing-submission.entity";
import { CreateUserWritingSubmissionDto } from "../dto/create-user-writing-submission.dto";
import { UpdateUserWritingSubmissionDto } from "../dto/update-user-writing-submission.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserWritingSubmissionDto } from "../dto/condition-user-writing-submission.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-writing-submissions")
@ApiTags("UserWritingSubmission")
export class UserWritingSubmissionController extends BaseControllerFactory<UserWritingSubmission>(
    UserWritingSubmission,
    ConditionUserWritingSubmissionDto,
    CreateUserWritingSubmissionDto,
    UpdateUserWritingSubmissionDto,
    {
        authorize: true,
        routes: {
            getMany: {
                enable: false,
            },
            getById: {
                roles: [SystemRole.ADMIN, SystemRole.USER],
            },
        },
    },
) {
    constructor(
        private readonly userWritingSubmissionService: UserWritingSubmissionService,
    ) {
        super(userWritingSubmissionService);
    }
}
