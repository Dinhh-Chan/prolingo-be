import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
    AllowSystemRoles,
    Authorization,
    ReqUser,
} from "@common/decorator/auth.decorator";
import { SystemRole } from "@module/user/common/constant";
import { User } from "@module/user/entities/user.entity";
import { GenerateExercisesForLessonDto } from "../dto/generate-exercises-for-lesson.dto";
import { ExerciseGenerationService } from "../services/exercise-generation.service";

@Controller("exercises")
@ApiTags("Exercise Generation")
@Authorization()
export class ExerciseGenerationController {
    constructor(
        private readonly exerciseGenerationService: ExerciseGenerationService,
    ) {}

    @Post("generate-for-lesson")
    @AllowSystemRoles(SystemRole.USER, SystemRole.ADMIN, SystemRole.STUDENT)
    @ApiOperation({
        summary: "Sinh exercise cho 1 lesson (chỉ lấy vocab chưa đạt)",
        description:
            "Sinh matching/fill-in-blank/pronunciation cho vocab level<4 và đến lịch ôn hoặc đang yếu. Không nhúng vào flow generate 7days.",
    })
    @ApiResponse({
        status: 201,
        description: "Đã sinh bài tập cho lesson.",
    })
    async generateForLesson(
        @ReqUser() user: User,
        @Body() dto: GenerateExercisesForLessonDto,
        @Query("lesson_id") lessonIdFromQuery?: string,
        @Query("limit") limitFromQuery?: string,
    ) {
        const lesson_id = dto?.lesson_id || lessonIdFromQuery;
        const limit =
            dto?.limit ??
            (limitFromQuery != null ? Number(limitFromQuery) : undefined);

        if (!lesson_id || typeof lesson_id !== "string") {
            throw new BadRequestException("lesson_id must be a string");
        }
        if (
            limit != null &&
            (!Number.isFinite(limit) || !Number.isInteger(limit) || limit < 2)
        ) {
            throw new BadRequestException(
                "limit must be an integer number >= 2",
            );
        }

        return this.exerciseGenerationService.generateForLesson(user, {
            lesson_id,
            limit,
        });
    }

    @Get("by-lesson/:lesson_id")
    @AllowSystemRoles(SystemRole.USER, SystemRole.ADMIN, SystemRole.STUDENT)
    @ApiOperation({
        summary: "Lấy danh sách bài tập theo lesson_id",
        description:
            "Dùng sau khi gọi generate-for-lesson để lấy content của matching/fill-in-blank/pronunciation theo thứ tự order_index.",
    })
    @ApiResponse({ status: 200, description: "Trả về mảng exercise" })
    async getExercisesByLesson(
        @ReqUser() user: User,
        @Param("lesson_id") lesson_id: string,
    ) {
        return this.exerciseGenerationService.getExercisesByLessonId(
            user,
            lesson_id,
        );
    }
}
