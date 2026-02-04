import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { Users } from "../entities/users.entity";

export interface UsersRepository extends BaseRepository<Users> {}
