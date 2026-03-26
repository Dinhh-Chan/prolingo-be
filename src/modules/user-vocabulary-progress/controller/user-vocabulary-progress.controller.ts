import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { UserVocabularyProgressService } from "../services/user-vocabulary-progress.service";
import { UserVocabularyProgress } from "../entities/user-vocabulary-progress.entity";
import { CreateUserVocabularyProgressDto } from "../dto/create-user-vocabulary-progress.dto";
import { UpdateUserVocabularyProgressDto } from "../dto/update-user-vocabulary-progress.dto";
import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ConditionUserVocabularyProgressDto } from "../dto/condition-user-vocabulary-progress.dto";
import { SystemRole } from "@module/user/common/constant";
import { AllowSystemRoles, ReqUser } from "@common/decorator/auth.decorator";
import { User } from "@module/user/entities/user.entity";
import { FlashcardSwipeDto } from "../dto/flashcard-swipe.dto";
import { FlashcardResetLessonDto } from "../dto/flashcard-reset-lesson.dto";
import { FlashcardSessionStartDto } from "../dto/flashcard-session-start.dto";
import { AbstractValidationPipe } from "@common/pipe/abstract-validation.pipe";

const flashcardSwipePipe = new AbstractValidationPipe(
    { whitelist: true },
    { body: FlashcardSwipeDto },
);
const flashcardResetPipe = new AbstractValidationPipe(
    { whitelist: true },
    { body: FlashcardResetLessonDto },
);

const flashcardSessionStartPipe = new AbstractValidationPipe(
    { whitelist: true },
    { body: FlashcardSessionStartDto },
);

@Controller("user-vocabulary-progress")
@ApiTags("UserVocabularyProgress")
export class UserVocabularyProgressController extends BaseControllerFactory<UserVocabularyProgress>(
    UserVocabularyProgress,
    ConditionUserVocabularyProgressDto,
    CreateUserVocabularyProgressDto,
    UpdateUserVocabularyProgressDto,
    {
        authorize: true,
        routes: {
            getMany: {
                enable: false,
            },
            getById: {
                roles: [SystemRole.ADMIN, SystemRole.USER],
            },
        },
    },
) {
    constructor(
        private readonly userVocabularyProgressService: UserVocabularyProgressService,
    ) {
        super(userVocabularyProgressService);
    }

    @Post("flashcard/swipe")
    @AllowSystemRoles(SystemRole.USER, SystemRole.ADMIN, SystemRole.STUDENT)
    @ApiOperation({
        summary: "Ghi nhận swipe flashcard (đã nhớ / chưa nhớ)",
        description:
            "Đã nhớ: +1 flashcard_remembered_count (tối đa ngưỡng). Chưa nhớ: reset count về 0. is_remembered = true khi count đủ ngưỡng.",
    })
    @UsePipes(flashcardSwipePipe)
    async flashcardSwipe(
        @ReqUser() user: User,
        @Body() dto: FlashcardSwipeDto,
    ) {
        return this.userVocabularyProgressService.recordFlashcardSwipe(
            user,
            dto,
        );
    }

    @Post("flashcard/reset-lesson")
    @AllowSystemRoles(SystemRole.USER, SystemRole.ADMIN, SystemRole.STUDENT)
    @ApiOperation({
        summary: "Reset flashcard cho mọi từ trong một lesson",
        description:
            "Đặt flashcard_remembered_count = 0, is_mastered = false cho các progress tồn tại.",
    })
    @UsePipes(flashcardResetPipe)
    async flashcardResetLesson(
        @ReqUser() user: User,
        @Body() dto: FlashcardResetLessonDto,
    ) {
        return this.userVocabularyProgressService.resetFlashcardForLesson(
            user,
            dto.lesson_id,
        );
    }

    @Post("flashcard/session/start")
    @AllowSystemRoles(SystemRole.USER, SystemRole.ADMIN, SystemRole.STUDENT)
    @ApiOperation({
        summary: "Bắt đầu một phiên học flashcard (mixer 70/30 new/old)",
        description:
            "Backend chọn ~70% từ mới + ~30% từ due/weak dựa trên next_review_at và is_weak, rồi trả danh sách thẻ và task speaking nhẹ.",
    })
    @UsePipes(flashcardSessionStartPipe)
    async flashcardSessionStart(
        @ReqUser() user: User,
        @Body() dto: FlashcardSessionStartDto,
    ) {
        return this.userVocabularyProgressService.startFlashcardSession(
            user,
            dto,
        );
    }
}
