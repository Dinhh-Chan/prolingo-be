import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import { Injectable } from "@nestjs/common";
import { Lesson } from "../entities/lesson.entity";
import { LessonRepository } from "../repository/lesson-repository.interface";
import { User } from "@module/user/entities/user.entity";
import { GetManyQuery, GetPageQuery } from "@common/constant";

@Injectable()
export class LessonService extends BaseService<Lesson, LessonRepository> {
    constructor(
        @InjectRepository(Entity.LESSON)
        private readonly lessonRepository: LessonRepository,
    ) {
        super(lessonRepository, {
            notFoundCode: "error-lesson-not-found",
        });
    }

    async getMany(
        user: User,
        conditions: any,
        query: GetManyQuery<Lesson>,
    ): Promise<Lesson[]> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { order_index: 1 },
        };
        return super.getMany(user, conditions, queryWithDefaultSort);
    }

    async getPage(
        user: User,
        conditions: any,
        query: GetPageQuery<Lesson>,
    ): Promise<any> {
        const queryWithDefaultSort = {
            ...query,
            sort: query.sort || { order_index: 1 },
        };
        return super.getPage(user, conditions, queryWithDefaultSort);
    }
}
