import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionUsersDto } from "../dto/condition-users.dto";
import { CreateUsersDto } from "../dto/create-users.dto";
import { UpdateUsersDto } from "../dto/update-users.dto";
import { Users } from "../entities/users.entity";
import { UsersService } from "../services/users.service";
import { SystemRole } from "@module/user/common/constant";

@Controller("users")
@ApiTags("Users")
export class UsersController extends BaseControllerFactory<Users>(
    Users,
    ConditionUsersDto,
    CreateUsersDto,
    UpdateUsersDto,
    {
        authorize: true,
        routes: {
            create: { enable: false },
            getById: { roles: [SystemRole.ADMIN, SystemRole.USER] },
        },
    },
) {
    constructor(private readonly usersService: UsersService) {
        super(usersService);
    }
}
