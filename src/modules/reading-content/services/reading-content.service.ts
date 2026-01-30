import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ReadingContent } from "../entities/reading-content.entity";
import { ReadingContentRepository } from "../repository/reading-content-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ReadingContentService extends BaseService<
    ReadingContent,
    ReadingContentRepository
> {
    constructor(
        @InjectRepository(Entity.READING_CONTENT)
        private readonly readingContentRepository: ReadingContentRepository,
    ) {
        super(readingContentRepository, {
            notFoundCode: "error-reading-content-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<ReadingContent>,
    ): Promise<ReadingContent[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<ReadingContent>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
