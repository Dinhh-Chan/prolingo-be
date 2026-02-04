import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { Users } from "../entities/users.entity";
import { UsersModel } from "../models/users.model";
import { UsersRepository } from "./users-repository.interface";

@Injectable()
export class UsersRepositorySql
    extends SqlRepository<Users>
    implements UsersRepository
{
    constructor(
        @InjectModel(UsersModel)
        private readonly usersModel: ModelCtor<UsersModel>,
    ) {
        super(usersModel);
    }
}
