import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ListeningContent } from "../entities/listening-content.entity";
import { ListeningContentRepository } from "../repository/listening-content-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ListeningContentService extends BaseService<
    ListeningContent,
    ListeningContentRepository
> {
    constructor(
        @InjectRepository(Entity.LISTENING_CONTENT)
        private readonly listeningContentRepository: ListeningContentRepository,
    ) {
        super(listeningContentRepository, {
            notFoundCode: "error-listening-content-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<ListeningContent>,
    ): Promise<ListeningContent[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<ListeningContent>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
