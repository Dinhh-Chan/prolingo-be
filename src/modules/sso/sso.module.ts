import { AuthMongoRepository } from "@module/auth/repository/auth-mongo.repository";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { UserModule } from "@module/user/user.module";
import { UserSqlRepository } from "@module/user/repository/user-sql.repository";
import { Global, Module } from "@nestjs/common";
import { SsoController } from "./sso.controller";
import { SsoService } from "./sso.service";

@Global()
@Module({
    imports: [UserModule],
    providers: [
        SsoService,
        RepositoryProvider(Entity.USER, UserSqlRepository),
        RepositoryProvider(Entity.AUTH, AuthMongoRepository),
    ],
    controllers: [SsoController],
    exports: [SsoService],
})
export class SsoModule {}
