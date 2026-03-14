import { Controller, Get, Post, Body, UsePipes } from "@nestjs/common";
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
}
