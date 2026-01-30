import { InjectModel } from "@nestjs/sequelize";
import { JobRoleModel } from "../models/job-role.model";
import { JobRole } from "../entities/job-role.entity";
import { JobRoleRepository } from "./job-role-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class JobRoleRepositorySql
    extends SqlRepository<JobRole>
    implements JobRoleRepository
{
    constructor(
        @InjectModel(JobRoleModel)
        private readonly jobRoleModel: typeof JobRoleModel,
    ) {
        super(jobRoleModel);
    }
}
