import { Module } from "@nestjs/common";
import { RoadmapController } from "./controller/roadmap.controller";
import { RoadmapService } from "./services/roadmap.service";
import { LearningPathModule } from "../learning-path/learning-path.module";
import { LearningModuleModule } from "../learning-module/learning-module.module";
import { LessonModule } from "../lesson/lesson.module";

@Module({
    imports: [LearningPathModule, LearningModuleModule, LessonModule],
    controllers: [RoadmapController],
    providers: [RoadmapService],
    exports: [RoadmapService],
})
export class RoadmapModule {}
