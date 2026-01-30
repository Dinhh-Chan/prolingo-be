import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { JobRoleService } from "../services/job-role.service";
import { JobRole } from "../entities/job-role.entity";
import { CreateJobRoleDto } from "../dto/create-job-role.dto";
import { UpdateJobRoleDto } from "../dto/update-job-role.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionJobRoleDto } from "../dto/condition-job-role.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("job-roles")
@ApiTags("JobRole")
export class JobRoleController extends BaseControllerFactory<JobRole>(
    JobRole,
    ConditionJobRoleDto,
    CreateJobRoleDto,
    UpdateJobRoleDto,
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
    constructor(private readonly jobRoleService: JobRoleService) {
        super(jobRoleService);
    }
}
