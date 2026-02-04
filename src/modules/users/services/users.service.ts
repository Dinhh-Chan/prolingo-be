import { createUserPassword } from "@common/constant";
import { Configuration } from "@config/configuration";
import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { SystemRole } from "@module/user/common/constant";
import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Users } from "../entities/users.entity";
import { UsersRepository } from "../repository/users-repository.interface";

@Injectable()
export class UsersService
    extends BaseService<Users, UsersRepository>
    implements OnApplicationBootstrap
{
    constructor(
        @InjectRepository(Entity.USERS)
        private readonly usersRepository: UsersRepository,
        private readonly configService: ConfigService<Configuration>,
    ) {
        super(usersRepository, {
            notFoundCode: "error-user-not-found",
        });
    }

    async onApplicationBootstrap() {
        try {
            const { defaultAdminUsername, defaultAdminPassword } =
                this.configService.get("server", { infer: true });

            const existing = await this.usersRepository.getOne({
                username: defaultAdminUsername,
            } as any);
            if (!existing) {
                await this.usersRepository.create({
                    username: defaultAdminUsername,
                    password: await createUserPassword(defaultAdminPassword),
                    email: "admin@prolingo.com",
                    systemRole: SystemRole.ADMIN,
                } as any);
                Logger.verbose(
                    `Đã tạo tài khoản admin: ${defaultAdminUsername}/${defaultAdminPassword}`,
                );
            }
        } catch (error) {
            Logger.error(`UsersService seed admin: ${error?.message}`);
        }
    }
}
