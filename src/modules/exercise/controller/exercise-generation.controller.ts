import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AbstractValidationPipe } from "@common/pipe/abstract-validation.pipe";
import { AllowSystemRoles, ReqUser } from "@common/decorator/auth.decorator";
import { SystemRole } from "@module/user/common/constant";
import { User } from "@module/user/entities/user.entity";
import { GenerateExercisesForLessonDto } from "../dto/generate-exercises-for-lesson.dto";
import { ExerciseGenerationService } from "../services/exercise-generation.service";

const generateExercisesPipe = new AbstractValidationPipe(
    { whitelist: true },
    { body: GenerateExercisesForLessonDto },
);

@Controller("exercises")
@ApiTags("Exercise Generation")
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
    @UsePipes(generateExercisesPipe)
    async generateForLesson(
        @ReqUser() user: User,
        @Body() dto: GenerateExercisesForLessonDto,
    ) {
        return this.exerciseGenerationService.generateForLesson(user, dto);
    }
}
