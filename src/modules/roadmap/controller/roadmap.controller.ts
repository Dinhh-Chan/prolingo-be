import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Authorization, ReqUser } from "@common/decorator/auth.decorator";
import { User } from "@module/user/entities/user.entity";
import { RoadmapService } from "../services/roadmap.service";

@Controller("roadmap")
@ApiTags("Roadmap")
@Authorization()
export class RoadmapController {
    constructor(private readonly roadmapService: RoadmapService) {}

    @Get("me")
    @ApiOperation({
        summary: "Lấy roadmap hiện tại của user",
        description:
            "Trả về learning_path gần nhất của user, danh sách learning_modules + lessons và đánh dấu is_current cho module/lesson hiện tại.",
    })
    async getMyRoadmap(@ReqUser() user: User) {
        return this.roadmapService.getMyRoadmap(user);
    }
}
