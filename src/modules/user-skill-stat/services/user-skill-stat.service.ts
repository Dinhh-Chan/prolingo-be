import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserSkillStat } from "../entities/user-skill-stat.entity";
import { UserSkillStatRepository } from "../repository/user-skill-stat-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserSkillStatService extends BaseService<
    UserSkillStat,
    UserSkillStatRepository
> {
    constructor(
        @InjectRepository(Entity.USER_SKILL_STAT)
        private readonly userSkillStatRepository: UserSkillStatRepository,
    ) {
        super(userSkillStatRepository, {
            notFoundCode: "error-user-skill-stat-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserSkillStat>,
    ): Promise<UserSkillStat[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserSkillStat>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
