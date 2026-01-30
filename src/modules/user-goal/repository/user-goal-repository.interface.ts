import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserGoal } from "../entities/user-goal.entity";

export interface UserGoalRepository extends BaseRepository<UserGoal> {}
