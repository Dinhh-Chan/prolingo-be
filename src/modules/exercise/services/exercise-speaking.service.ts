import { ApiError } from "@config/exception/api-error";
import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "@module/user/entities/user.entity";
import { VocabularyService } from "@module/vocabulary/services/vocabulary.service";
import { UserSpeakingAttemptService } from "@module/user-speaking-attempt/services/user-speaking-attempt.service";
import { UserVocabularyProgressService } from "@module/user-vocabulary-progress/services/user-vocabulary-progress.service";
import {
    FlashcardSwipeDto,
    FlashcardSwipeOutcome,
} from "@module/user-vocabulary-progress/dto/flashcard-swipe.dto";
import { PronunciationAssessmentClient } from "./pronunciation-assessment.client";

/** Điểm API trả về 0–100 */
const DEFAULT_PASS_SCORE = 75;

@Injectable()
export class ExerciseSpeakingService {
    constructor(
        private readonly pronunciationClient: PronunciationAssessmentClient,
        private readonly vocabularyService: VocabularyService,
        private readonly userSpeakingAttemptService: UserSpeakingAttemptService,
        private readonly userVocabularyProgressService: UserVocabularyProgressService,
    ) {}

    async submitPronunciationFromUpload(
        user: User,
        file: Express.Multer.File | undefined,
        dto: {
            vocab_id: string;
            lesson_id?: string;
            reference_text?: string;
            speaking_level?: number;
        },
    ): Promise<{
        assessment_raw: unknown;
        score: number | null;
        passed: boolean;
        reference_text: string;
        attempt_id: string;
        progress_updated: boolean;
    }> {
        if (!file?.buffer?.length) {
            throw new BadRequestException("audio_file is required");
        }

        const vocab = await this.vocabularyService.getById(user, dto.vocab_id, {
            enableDataPartition: false,
        } as any);
        if (!vocab?.word) {
            throw ApiError.NotFound("error-vocabulary-not-found");
        }

        const referenceText = (dto.reference_text?.trim() || vocab.word).trim();
        const speakingLevel = dto.speaking_level ?? 1;

        const { raw, data } = await this.pronunciationClient.assess(
            file.buffer,
            file.originalname,
            file.mimetype,
            referenceText,
        );

        const scoreRaw = data?.score;
        const scoreNum =
            typeof scoreRaw === "number" && Number.isFinite(scoreRaw)
                ? scoreRaw
                : null;
        const passed =
            scoreNum !== null ? scoreNum >= DEFAULT_PASS_SCORE : false;

        const lessonId =
            dto.lesson_id?.trim() !== "" ? dto.lesson_id?.trim() : undefined;

        const attempt = await this.userSpeakingAttemptService.create(
            user,
            {
                user_id: user._id,
                vocab_id: dto.vocab_id,
                lesson_id: lessonId,
                speaking_level: speakingLevel,
                reference_text: referenceText,
                audio_url: undefined,
                score: scoreNum ?? undefined,
                raw_response: (raw ?? {}) as Record<string, unknown>,
                passed,
            } as any,
            { enableDataPartition: false } as any,
        );

        let progressUpdated = false;
        if (passed) {
            await this.userVocabularyProgressService.recordFlashcardSwipe(
                user,
                {
                    vocab_id: dto.vocab_id,
                    outcome: FlashcardSwipeOutcome.REMEMBERED,
                } as FlashcardSwipeDto,
            );
            progressUpdated = true;
        }

        return {
            assessment_raw: raw,
            score: scoreNum,
            passed,
            reference_text: referenceText,
            attempt_id: attempt._id,
            progress_updated: progressUpdated,
        };
    }
}
