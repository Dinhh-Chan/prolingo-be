import { Injectable } from "@nestjs/common";
import axios from "axios";
import { randomBytes } from "crypto";
import { User } from "@module/user/entities/user.entity";
import { UserNotificationSettingService } from "@module/user-notification-setting/services/user-notification-setting.service";
import { LearningPathService } from "@module/learning-path/services/learning-path.service";
import { LearningModuleService } from "@module/learning-module/services/learning-module.service";
import { LessonService } from "@module/lesson/services/lesson.service";
import { VocabularyService } from "@module/vocabulary/services/vocabulary.service";
import { ExampleSentenceService } from "@module/example-sentence/services/example-sentence.service";
import { LessonVocabularyService } from "@module/lesson-vocabulary/services/lesson-vocabulary.service";
import {
    SURVEY_CURRENT_STATUS_OPTIONS,
    SURVEY_ENGLISH_LEVEL_OPTIONS,
    SURVEY_DAILY_GOAL_OPTIONS,
    SURVEY_COURSE_DURATION_OPTIONS,
} from "../constants/survey-options.constant";
import { SurveyOptionsResponseDto } from "../dto/survey-options-response.dto";
import { SubmitSurveyDto } from "../dto/submit-survey.dto";
import { OpenAILearningPathService } from "./openai-learning-path.service";
import { LearningPath } from "@module/learning-path/entities/learning-path.entity";
import { LearningModule } from "@module/learning-module/entities/learning-module.entity";
import { Lesson } from "@module/lesson/entities/lesson.entity";
import { Vocabulary } from "@module/vocabulary/entities/vocabulary.entity";
import { ExampleSentence } from "@module/example-sentence/entities/example-sentence.entity";
import { VocabularyDomain } from "@module/vocabulary/common/vocabulary-domain.enum";
import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";
import { SurveyRepository } from "../repository/survey-repository.interface";

const GENERATE_SENTENCE_URL =
    "https://aivocabio.iuptit.com/api/v1/generate/generate-sentence";

@Injectable()
export class SurveyService {
    constructor(
        @InjectRepository(Entity.SURVEY)
        private readonly surveyRepository: SurveyRepository,
        private readonly userNotificationSettingService: UserNotificationSettingService,
        private readonly learningPathService: LearningPathService,
        private readonly learningModuleService: LearningModuleService,
        private readonly lessonService: LessonService,
        private readonly vocabularyService: VocabularyService,
        private readonly exampleSentenceService: ExampleSentenceService,
        private readonly lessonVocabularyService: LessonVocabularyService,
        private readonly openAILearningPathService: OpenAILearningPathService,
    ) {}

    /**
     * Lấy toàn bộ lựa chọn cho form khảo sát:
     * Who are you?, Select your field, English level, Daily goal, Course duration
     */
    async getOptions(user: User): Promise<SurveyOptionsResponseDto> {
        return {
            currentStatusOptions: [...SURVEY_CURRENT_STATUS_OPTIONS],
            englishLevelOptions: [...SURVEY_ENGLISH_LEVEL_OPTIONS],
            dailyGoalOptions: [...SURVEY_DAILY_GOAL_OPTIONS],
            courseDurationOptions: [...SURVEY_COURSE_DURATION_OPTIONS],
            industries: [],
            jobRoles: [],
        };
    }

    /**
     * Gửi kết quả khảo sát: lưu bản ghi survey, cập nhật notification setting
     */
    async submitSurvey(user: User, dto: SubmitSurveyDto) {
        await this.userNotificationSettingService.upsertByUserId(user, {
            daily_reminder_enabled: dto.daily_reminder_enabled,
            reminder_time: dto.reminder_time,
        });

        // Lưu toàn bộ lượt survey vào bảng surveys
        await this.surveyRepository.create({
            user_id: user._id,
            current_status: dto.current_status,
            industry_name: dto.industry_name,
            role_id: dto.role_id,
            english_level: dto.english_level,
            daily_learning_minutes: dto.daily_learning_minutes,
            daily_reminder_enabled: dto.daily_reminder_enabled,
            reminder_time: dto.reminder_time,
            custom_focus: dto.custom_focus,
            custom_focus_2: dto.custom_focus_2,
            course_duration_weeks: dto.course_duration_weeks,
        } as any);

        return { success: true };
    }

    async hasAnySurvey(user: User): Promise<boolean> {
        return this.surveyRepository.exists(
            { user_id: user._id } as any,
            { enableDataPartition: false } as any,
        );
    }

    /**
     * Từ thông tin survey của user, gọi OpenAI sinh lộ trình học 4 tuần rồi tạo LearningPath + Modules + Lessons.
     */
    async generateLearningPathFromSurvey(user: User): Promise<{
        path: LearningPath;
        modules: LearningModule[];
        lessonCount: number;
    }> {
        if (!this.openAILearningPathService.isConfigured()) {
            throw new BadRequestException(
                "OPENAI_API_KEY is not configured. Cannot generate learning path.",
            );
        }

        const latestSurvey = await this.surveyRepository.getOne(
            { user_id: user._id } as any,
            {
                sort: { created_at: -1 } as any,
                enableDataPartition: false,
            } as any,
        );
        if (!latestSurvey) {
            throw new BadRequestException(
                "User has not completed survey. Please submit survey first.",
            );
        }

        const context = {
            current_status: latestSurvey.current_status,
            industry_name: latestSurvey.industry_name,
            english_level: latestSurvey.english_level,
            daily_learning_minutes: latestSurvey.daily_learning_minutes,
            custom_focus: latestSurvey.custom_focus,
            custom_focus_2: latestSurvey.custom_focus_2,
            course_duration_weeks: latestSurvey.course_duration_weeks ?? 4,
        };

        const payload =
            await this.openAILearningPathService.generateLearningPath(context);

        const path = await this.learningPathService.create(user, {
            user_id: user._id,
            name_en: payload.name_en,
            name_vi: payload.name_vi,
            description: payload.description,
            target_level: payload.target_level,
            estimated_hours: Math.ceil(
                payload.estimated_hours ??
                    (4 * 5 * (latestSurvey.daily_learning_minutes ?? 15)) / 60,
            ),
            is_active: true,
        } as Partial<LearningPath>);

        const createdModules: LearningModule[] = [];
        let lessonCount = 0;

        for (const mod of payload.modules) {
            const createdModule = await this.learningModuleService.create(
                user,
                {
                    path_id: path._id,
                    name_en: mod.name_en,
                    name_vi: mod.name_vi,
                    order_index: mod.order_index,
                } as Partial<LearningModule>,
            );
            createdModules.push(createdModule);

            for (const les of mod.lessons) {
                await this.lessonService.create(user, {
                    module_id: createdModule._id,
                    name_en: les.name_en,
                    name_vi: les.name_vi,
                    order_index: les.order_index,
                    lesson_type: les.lesson_type,
                    estimated_minutes: les.estimated_minutes,
                } as Partial<Lesson>);
                lessonCount += 1;
            }
        }

        return { path, modules: createdModules, lessonCount };
    }

    /**
     * Sinh lịch 7 ngày từ survey: 1 path, 1 module (tuần), 7 lesson (mỗi ngày),
     * mỗi ngày có từ vựng kèm usage example + dịch, lưu vocabulary, example_sentences, lesson_vocabulary.
     */
    async generateSchedule7DaysFromSurvey(user: User): Promise<{
        path: LearningPath;
        module: LearningModule;
        lessons: Lesson[];
        totalVocabulary: number;
    }> {
        if (!this.openAILearningPathService.isConfigured()) {
            throw new BadRequestException(
                "OPENAI_API_KEY is not configured. Cannot generate schedule.",
            );
        }

        const latestSurvey = await this.surveyRepository.getOne(
            { user_id: user._id } as any,
            {
                sort: { created_at: -1 } as any,
                enableDataPartition: false,
            } as any,
        );
        if (!latestSurvey) {
            throw new BadRequestException(
                "User has not completed survey. Please submit survey first.",
            );
        }

        const context = {
            current_status: latestSurvey.current_status,
            industry_name: latestSurvey.industry_name,
            english_level: latestSurvey.english_level,
            daily_learning_minutes: latestSurvey.daily_learning_minutes,
            custom_focus: latestSurvey.custom_focus,
            custom_focus_2: latestSurvey.custom_focus_2,
            course_duration_weeks: latestSurvey.course_duration_weeks ?? 4,
        };

        const payload =
            await this.openAILearningPathService.generateSchedule7Days(context);

        const path = await this.learningPathService.create(user, {
            user_id: user._id,
            name_en: payload.name_en,
            name_vi: payload.name_vi,
            description: payload.description,
            target_level: "beginner",
            estimated_hours: Math.ceil(
                (7 * (latestSurvey.daily_learning_minutes ?? 15)) / 60,
            ),
            is_active: true,
        } as Partial<LearningPath>);

        const createdModule = await this.learningModuleService.create(user, {
            path_id: path._id,
            name_en: "Week 1",
            name_vi: "Tuần 1",
            order_index: 1,
        } as Partial<LearningModule>);

        const createdLessons: Lesson[] = [];
        let totalVocabulary = 0;

        for (const day of payload.days) {
            const lesson = await this.lessonService.create(user, {
                module_id: createdModule._id,
                name_en: day.name_en,
                name_vi: day.name_vi,
                order_index: day.order_index,
                lesson_type: "vocabulary",
                estimated_minutes: latestSurvey.daily_learning_minutes ?? 15,
            } as Partial<Lesson>);
            createdLessons.push(lesson);

            for (let i = 0; i < (day.vocabulary?.length ?? 0); i++) {
                const v = day.vocabulary[i];
                // create() đã tự kiểm tra tồn tại theo (word, domain) và chỉ gọi TTS khi cần.
                const vocab = await this.vocabularyService.create(user, {
                    word: v.word ?? "",
                    domain: v.domain ?? VocabularyDomain.GENERAL,
                    phonetic: v.phonetic ?? undefined,
                    part_of_speech: v.part_of_speech ?? undefined,
                    definition_en: v.definition_en ?? undefined,
                    definition_vi: v.definition_vi ?? undefined,
                    difficulty_level: v.difficulty_level ?? undefined,
                    audio_url: undefined,
                    image_url: undefined,
                } as Partial<Vocabulary>);

                // Sinh câu ví dụ theo API (usage example) + dịch nghĩa sang tiếng Việt.
                const sentenceResp = await axios.post(
                    GENERATE_SENTENCE_URL,
                    { vocabulary: v.word ?? vocab.word },
                    {
                        headers: {
                            accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        timeout: 60000,
                    },
                );

                const sentence_en_raw =
                    sentenceResp.data?.data?.sentence ??
                    sentenceResp.data?.data?.sentence ??
                    v.usage_example_en ??
                    "";

                const sentence_en =
                    sentence_en_raw ||
                    `I will use "${vocab.word}" in a natural sentence.`;

                const sentence_vi =
                    await this.openAILearningPathService.translateToVietnamese(
                        sentence_en,
                    );

                await this.exampleSentenceService.create(user, {
                    vocab_id: vocab._id,
                    sentence_en,
                    sentence_vi,
                } as Partial<ExampleSentence>);

                const lvId = randomBytes(12).toString("hex");
                await this.lessonVocabularyService.create(user, {
                    _id: lvId,
                    lesson_id: lesson._id,
                    vocab_id: vocab._id,
                    order_index: i + 1,
                } as any);
                totalVocabulary += 1;
            }
        }

        return {
            path,
            module: createdModule,
            lessons: createdLessons,
            totalVocabulary,
        };
    }
}
