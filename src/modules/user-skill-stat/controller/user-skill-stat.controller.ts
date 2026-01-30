import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserSkillStatService } from "../services/user-skill-stat.service";
import { UserSkillStat } from "../entities/user-skill-stat.entity";
import { CreateUserSkillStatDto } from "../dto/create-user-skill-stat.dto";
import { UpdateUserSkillStatDto } from "../dto/update-user-skill-stat.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUserSkillStatDto } from "../dto/condition-user-skill-stat.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("user-skill-stats")
@ApiTags("UserSkillStat")
export class UserSkillStatController extends BaseControllerFactory<UserSkillStat>(
    UserSkillStat,
    ConditionUserSkillStatDto,
    CreateUserSkillStatDto,
    UpdateUserSkillStatDto,
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
    constructor(private readonly userSkillStatService: UserSkillStatService) {
        super(userSkillStatService);
    }
}
