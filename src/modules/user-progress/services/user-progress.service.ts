import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserProgress } from "../entities/user-progress.entity";
import { UserProgressRepository } from "../repository/user-progress-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserProgressService extends BaseService<
    UserProgress,
    UserProgressRepository
> {
    constructor(
        @InjectRepository(Entity.USER_PROGRESS)
        private readonly userProgressRepository: UserProgressRepository,
    ) {
        super(userProgressRepository, {
            notFoundCode: "error-user-progress-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserProgress>,
    ): Promise<UserProgress[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserProgress>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
