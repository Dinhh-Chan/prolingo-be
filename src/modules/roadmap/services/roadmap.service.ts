import { Injectable } from "@nestjs/common";
import { LearningPathService } from "@module/learning-path/services/learning-path.service";
import { LearningModuleService } from "@module/learning-module/services/learning-module.service";
import { LessonService } from "@module/lesson/services/lesson.service";
import { User } from "@module/user/entities/user.entity";

@Injectable()
export class RoadmapService {
    constructor(
        private readonly learningPathService: LearningPathService,
        private readonly learningModuleService: LearningModuleService,
        private readonly lessonService: LessonService,
    ) {}

    async getMyRoadmap(user: User): Promise<any> {
        const learningPath = await this.learningPathService.getOne(
            user,
            { user_id: user._id } as any,
            {
                sort: { created_at: -1 },
                enableDataPartition: false,
            } as any,
        );

        if (!learningPath) {
            return {
                learning_path: null,
                learning_modules: [],
                current_module_id: null,
                current_lesson_id: null,
            };
        }

        const modules = await this.learningModuleService.getMany(
            user,
            { path_id: learningPath._id } as any,
            {
                sort: { order_index: 1 },
                enableDataPartition: false,
            } as any,
        );

        const currentModule = modules[0] || null;
        let currentLessonId: string | null = null;

        const learningModules = await Promise.all(
            modules.map(async (moduleItem) => {
                const lessons = await this.lessonService.getMany(
                    user,
                    { module_id: moduleItem._id } as any,
                    {
                        sort: { order_index: 1 },
                        enableDataPartition: false,
                    } as any,
                );

                if (
                    moduleItem._id === currentModule?._id &&
                    lessons.length > 0
                ) {
                    currentLessonId = lessons[0]._id;
                }

                return {
                    ...moduleItem,
                    is_current: moduleItem._id === currentModule?._id,
                    lessons: lessons.map((lesson) => ({
                        ...lesson,
                        is_current: false,
                    })),
                };
            }),
        );

        const modulesWithCurrentLesson = learningModules.map((moduleItem) => ({
            ...moduleItem,
            lessons: moduleItem.lessons.map((lesson) => ({
                ...lesson,
                is_current:
                    moduleItem.is_current === true &&
                    lesson._id === currentLessonId,
            })),
        }));

        return {
            learning_path: learningPath,
            learning_modules: modulesWithCurrentLesson,
            current_module_id: currentModule?._id || null,
            current_lesson_id: currentLessonId,
        };
    }
}
