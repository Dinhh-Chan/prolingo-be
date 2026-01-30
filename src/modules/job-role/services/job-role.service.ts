import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { JobRole } from "../entities/job-role.entity";
import { JobRoleRepository } from "../repository/job-role-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class JobRoleService extends BaseService<JobRole, JobRoleRepository> {
    constructor(
        @InjectRepository(Entity.JOB_ROLE)
        private readonly jobRoleRepository: JobRoleRepository,
    ) {
        super(jobRoleRepository, {
            notFoundCode: "error-job-role-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<JobRole>,
    ): Promise<JobRole[]> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name_vi: 1 },
        };

        return super.getMany(user, conditions, queryWithDefaultSort);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<JobRole>,
    ): Promise<any> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { name_vi: 1 },
        };
        return super.getPage(user, conditions, queryWithDefaultSort);
    }
}
