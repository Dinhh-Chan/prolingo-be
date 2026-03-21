import { VocabularyDomain } from "@module/vocabulary/common/vocabulary-domain.enum";

/** Cấu trúc bài học do OpenAI sinh (1 tuần ~ 1 module) */
export interface GeneratedLesson {
    name_en: string;
    name_vi: string;
    order_index: number;
    lesson_type?: string;
    estimated_minutes?: number;
}

/** Cấu trúc module (tuần) do OpenAI sinh */
export interface GeneratedModule {
    name_en: string;
    name_vi: string;
    order_index: number;
    lessons: GeneratedLesson[];
}

/** Cấu trúc lộ trình do OpenAI trả về (JSON) */
export interface GeneratedLearningPathPayload {
    name_en: string;
    name_vi: string;
    description?: string;
    target_level?: string;
    estimated_hours?: number;
    modules: GeneratedModule[];
}

/** Từ vựng cho 1 ngày (có usage example + dịch) */
export interface GeneratedDayVocab {
    word: string;
    phonetic?: string;
    part_of_speech?: string;
    definition_en?: string;
    definition_vi?: string;
    difficulty_level?: string;
    domain?: VocabularyDomain;
    usage_example_en: string;
    usage_example_vi: string;
}

/** Một ngày trong lịch 7 ngày */
export interface GeneratedScheduleDay {
    day_index: number;
    name_en: string;
    name_vi: string;
    order_index: number;
    vocabulary: GeneratedDayVocab[];
}

/** Payload lịch 7 ngày do OpenAI trả về */
export interface GeneratedSchedule7DaysPayload {
    name_en: string;
    name_vi: string;
    description?: string;
    days: GeneratedScheduleDay[];
}
