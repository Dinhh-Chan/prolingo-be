import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
    UsePipes,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import {
    AllowSystemRoles,
    Authorization,
    ReqUser,
} from "@common/decorator/auth.decorator";
import { AbstractValidationPipe } from "@common/pipe/abstract-validation.pipe";
import { SystemRole } from "@module/user/common/constant";
import { User } from "@module/user/entities/user.entity";
import { GenerateExercisesForLessonDto } from "../dto/generate-exercises-for-lesson.dto";
import { GenerateSpeakingForLessonDto } from "../dto/generate-speaking-for-lesson.dto";
import { SpeakingPronunciationSubmitDto } from "../dto/speaking-pronunciation-submit.dto";
import { ExerciseGenerationService } from "../services/exercise-generation.service";
import { ExerciseSpeakingService } from "../services/exercise-speaking.service";

const generateSpeakingPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: GenerateSpeakingForLessonDto },
);

const speakingSubmitPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: SpeakingPronunciationSubmitDto },
);

@Controller("exercises")
@ApiTags("Exercise Generation")
@Authorization()
export class ExerciseGenerationController {
    constructor(
        private readonly exerciseGenerationService: ExerciseGenerationService,
        private readonly exerciseSpeakingService: ExerciseSpeakingService,
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

    @Post("generate-speaking-for-lesson")
    @AllowSystemRoles(SystemRole.USER, SystemRole.ADMIN, SystemRole.STUDENT)
    @UsePipes(generateSpeakingPipe)
    @ApiOperation({
        summary: "Sinh bài speaking (phát âm từ) cho toàn bộ từ trong lesson",
        description:
            "Mỗi từ = 1 exercise (content.reference_text = word), type_id theo exercise_type.code (vd speaking_lv1). Gắn lesson_exercises.",
    })
    @ApiResponse({ status: 201 })
    async generateSpeakingForLesson(
        @ReqUser() user: User,
        @Body() dto: GenerateSpeakingForLessonDto,
    ) {
        return this.exerciseGenerationService.generateSpeakingForLesson(
            user,
            dto,
        );
    }

    @Post("speaking/submit-pronunciation")
    @AllowSystemRoles(SystemRole.USER, SystemRole.ADMIN, SystemRole.STUDENT)
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            required: ["audio_file", "vocab_id"],
            properties: {
                audio_file: { type: "string", format: "binary" },
                vocab_id: { type: "string" },
                lesson_id: { type: "string" },
                reference_text: { type: "string" },
                speaking_level: { type: "integer", minimum: 1, maximum: 4 },
            },
        },
    })
    @UseInterceptors(FileInterceptor("audio_file"))
    @UsePipes(speakingSubmitPipe)
    @ApiOperation({
        summary: "Nộp audio chấm phát âm (aivocabio) và cập nhật tiến độ từ",
        description:
            "Gọi VOCABIO_PRONUNCIATION_ASSESSMENT_URL. Điểm >= 75: ghi user_speaking_attempts + recordFlashcardSwipe(REMEMBERED).",
    })
    async submitSpeakingPronunciation(
        @ReqUser() user: User,
        @UploadedFile() audio_file: Express.Multer.File,
        @Body() body: SpeakingPronunciationSubmitDto,
    ) {
        return this.exerciseSpeakingService.submitPronunciationFromUpload(
            user,
            audio_file,
            body,
        );
    }
}
