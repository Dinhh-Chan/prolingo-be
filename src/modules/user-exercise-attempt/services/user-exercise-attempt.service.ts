import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { UserExerciseAttempt } from "../entities/user-exercise-attempt.entity";
import { UserExerciseAttemptRepository } from "../repository/user-exercise-attempt-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class UserExerciseAttemptService extends BaseService<
    UserExerciseAttempt,
    UserExerciseAttemptRepository
> {
    constructor(
        @InjectRepository(Entity.USER_EXERCISE_ATTEMPT)
        private readonly userExerciseAttemptRepository: UserExerciseAttemptRepository,
    ) {
        super(userExerciseAttemptRepository, {
            notFoundCode: "error-user-exercise-attempt-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<UserExerciseAttempt>,
    ): Promise<UserExerciseAttempt[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<UserExerciseAttempt>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
