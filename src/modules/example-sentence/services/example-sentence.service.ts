import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { ExampleSentence } from "../entities/example-sentence.entity";
import { ExampleSentenceRepository } from "../repository/example-sentence-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class ExampleSentenceService extends BaseService<
    ExampleSentence,
    ExampleSentenceRepository
> {
    constructor(
        @InjectRepository(Entity.EXAMPLE_SENTENCE)
        private readonly exampleSentenceRepository: ExampleSentenceRepository,
    ) {
        super(exampleSentenceRepository, {
            notFoundCode: "error-example-sentence-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<ExampleSentence>,
    ): Promise<ExampleSentence[]> {
        return super.getMany(user, conditions, query);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<ExampleSentence>,
    ): Promise<any> {
        return super.getPage(user, conditions, query);
    }
}
