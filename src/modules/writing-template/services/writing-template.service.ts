import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { WritingTemplate } from "../entities/writing-template.entity";
import { WritingTemplateRepository } from "../repository/writing-template-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class WritingTemplateService extends BaseService<
    WritingTemplate,
    WritingTemplateRepository
> {
    constructor(
        @InjectRepository(Entity.WRITING_TEMPLATE)
        private readonly writingTemplateRepository: WritingTemplateRepository,
    ) {
        super(writingTemplateRepository, {
            notFoundCode: "error-writing-template-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<WritingTemplate>,
    ): Promise<WritingTemplate[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<WritingTemplate>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
