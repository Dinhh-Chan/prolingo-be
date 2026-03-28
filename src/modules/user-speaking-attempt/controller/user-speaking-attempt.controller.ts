import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { SystemRole } from "@module/user/common/constant";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserSpeakingAttemptDto } from "../dto/condition-user-speaking-attempt.dto";
import { CreateUserSpeakingAttemptDto } from "../dto/create-user-speaking-attempt.dto";
import { UpdateUserSpeakingAttemptDto } from "../dto/update-user-speaking-attempt.dto";
import { UserSpeakingAttempt } from "../entities/user-speaking-attempt.entity";
import { UserSpeakingAttemptService } from "../services/user-speaking-attempt.service";

@Controller("user-speaking-attempts")
@ApiTags("UserSpeakingAttempt")
export class UserSpeakingAttemptController extends BaseControllerFactory<UserSpeakingAttempt>(
    UserSpeakingAttempt,
    ConditionUserSpeakingAttemptDto,
    CreateUserSpeakingAttemptDto,
    UpdateUserSpeakingAttemptDto,
    {
        authorize: true,
        routes: {
            getMany: {
                enable: false,
            },
            create: {
                roles: [SystemRole.ADMIN, SystemRole.USER, SystemRole.STUDENT],
            },
            getById: {
                roles: [SystemRole.ADMIN, SystemRole.USER],
            },
        },
    },
) {
    constructor(
        private readonly userSpeakingAttemptService: UserSpeakingAttemptService,
    ) {
        super(userSpeakingAttemptService);
    }
}
