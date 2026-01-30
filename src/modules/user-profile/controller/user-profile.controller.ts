import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserProfileService } from "../services/user-profile.service";
import { UserProfile } from "../entities/user-profile.entity";
import { CreateUserProfileDto } from "../dto/create-user-profile.dto";
import { UpdateUserProfileDto } from "../dto/update-user-profile.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserProfileDto } from "../dto/condition-user-profile.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-profiles")
@ApiTags("UserProfile")
export class UserProfileController extends BaseControllerFactory<UserProfile>(
    UserProfile,
    ConditionUserProfileDto,
    CreateUserProfileDto,
    UpdateUserProfileDto,
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
    constructor(private readonly userProfileService: UserProfileService) {
        super(userProfileService);
    }
}
