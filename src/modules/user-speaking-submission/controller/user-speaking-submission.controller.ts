import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserSpeakingSubmissionService } from "../services/user-speaking-submission.service";
import { UserSpeakingSubmission } from "../entities/user-speaking-submission.entity";
import { CreateUserSpeakingSubmissionDto } from "../dto/create-user-speaking-submission.dto";
import { UpdateUserSpeakingSubmissionDto } from "../dto/update-user-speaking-submission.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserSpeakingSubmissionDto } from "../dto/condition-user-speaking-submission.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-speaking-submissions")
@ApiTags("UserSpeakingSubmission")
export class UserSpeakingSubmissionController extends BaseControllerFactory<UserSpeakingSubmission>(
    UserSpeakingSubmission,
    ConditionUserSpeakingSubmissionDto,
    CreateUserSpeakingSubmissionDto,
    UpdateUserSpeakingSubmissionDto,
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
        private readonly userSpeakingSubmissionService: UserSpeakingSubmissionService,
    ) {
        super(userSpeakingSubmissionService);
    }
}
