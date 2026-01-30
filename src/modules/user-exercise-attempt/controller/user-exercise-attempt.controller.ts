import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserExerciseAttemptService } from "../services/user-exercise-attempt.service";
import { UserExerciseAttempt } from "../entities/user-exercise-attempt.entity";
import { CreateUserExerciseAttemptDto } from "../dto/create-user-exercise-attempt.dto";
import { UpdateUserExerciseAttemptDto } from "../dto/update-user-exercise-attempt.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserExerciseAttemptDto } from "../dto/condition-user-exercise-attempt.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-exercise-attempts")
@ApiTags("UserExerciseAttempt")
export class UserExerciseAttemptController extends BaseControllerFactory<UserExerciseAttempt>(
    UserExerciseAttempt,
    ConditionUserExerciseAttemptDto,
    CreateUserExerciseAttemptDto,
    UpdateUserExerciseAttemptDto,
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
        private readonly userExerciseAttemptService: UserExerciseAttemptService,
    ) {
        super(userExerciseAttemptService);
    }
}
