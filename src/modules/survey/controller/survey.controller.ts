import {
    Controller,
    Get,
    Post,
    Body,
    UsePipes,
    HttpCode,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Authorization, ReqUser } from "@common/decorator/auth.decorator";
import { User } from "@module/user/entities/user.entity";
import { SurveyService } from "../services/survey.service";
import { SurveyOptionsResponseDto } from "../dto/survey-options-response.dto";
import { SubmitSurveyDto } from "../dto/submit-survey.dto";
import { AbstractValidationPipe } from "@common/pipe/abstract-validation.pipe";

@Controller("survey")
@ApiTags("Survey")
@Authorization()
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Get("options")
    @ApiOperation({
        summary: "Lấy danh sách lựa chọn cho form khảo sát",
        description:
            "Who are you?, Select your field (industries, job roles), English level, Daily goal, Course duration.",
    })
    @ApiResponse({ status: 200, type: SurveyOptionsResponseDto })
    async getOptions(@ReqUser() user: User): Promise<SurveyOptionsResponseDto> {
        return this.surveyService.getOptions(user);
    }

    @Post()
    @ApiOperation({
        summary: "Gửi kết quả khảo sát",
        description:
            "Lưu: Who are you?, Select your field, English level, Daily goal, Stay on track (reminder), Personalize your journey.",
    })
    @ApiResponse({ status: 201, description: "Khảo sát đã được lưu." })
    @UsePipes(
        new AbstractValidationPipe(
            { whitelist: true },
            { body: SubmitSurveyDto },
        ),
    )
    async submitSurvey(@ReqUser() user: User, @Body() dto: SubmitSurveyDto) {
        return this.surveyService.submitSurvey(user, dto);
    }

    @Post("generate-learning-path")
    @ApiOperation({
        summary: "Sinh lộ trình học 4 tuần từ kết quả khảo sát",
        description:
            "Dùng OpenAI để tạo lộ trình (path + modules + lessons) theo survey đã gửi, rồi lưu vào DB.",
    })
    @ApiResponse({
        status: 201,
        description: "Đã tạo lộ trình học (path, modules, lessonCount).",
    })
    async generateLearningPathFromSurvey(@ReqUser() user: User) {
        return this.surveyService.generateLearningPathFromSurvey(user);
    }

    @Post("generate-schedule-7days")
    @ApiOperation({
        summary: "Sinh lịch học 7 ngày từ khảo sát",
        description:
            "Sinh 7 ngày (7 lesson), mỗi ngày có từ vựng kèm usage example và bản dịch. Lưu path, module, lessons, vocabulary, example_sentences, lesson_vocabulary.",
    })
    @ApiResponse({
        status: 201,
        description:
            "Đã tạo lịch 7 ngày (path, module, lessons, totalVocabulary).",
    })
    async generateSchedule7Days(@ReqUser() user: User) {
        return this.surveyService.generateSchedule7DaysFromSurvey(user);
    }

    @Post("generate-schedule-7days/async")
    @HttpCode(202)
    @ApiOperation({
        summary: "Khởi tạo lịch học 7 ngày (async) từ khảo sát",
        description:
            "Tránh timeout gateway: tạo skeleton path/module/7 lessons ngay và chạy phần sinh nặng (OpenAI + TTS + example + exercises) ở background. FE/poll sẽ gọi các API GET để lấy dữ liệu khi sẵn sàng.",
    })
    @ApiResponse({
        status: 202,
        description: "Đã khởi tạo và đang xử lý (202 Accepted).",
    })
    async generateSchedule7DaysAsync(@ReqUser() user: User) {
        return this.surveyService.startGenerateSchedule7DaysFromSurvey(user);
    }
}
