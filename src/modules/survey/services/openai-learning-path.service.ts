import { Injectable } from "@nestjs/common";
import axios from "axios";
import {
    GeneratedLearningPathPayload,
    GeneratedSchedule7DaysPayload,
    GeneratedScheduleDay,
    GeneratedDayVocab,
} from "../types/generated-learning-path.types";

export interface SurveyContextForAI {
    current_status?: string;
    industry_name?: string;
    english_level?: string;
    daily_learning_minutes?: number;
    custom_focus?: string;
    custom_focus_2?: string;
    course_duration_weeks?: number;
}

const SYSTEM_PROMPT = `You are an expert English learning path designer. Given a user's survey answers, you must output a single valid JSON object (no markdown, no code block) with this exact structure:
{
  "name_en": "string - course title in English",
  "name_vi": "string - course title in Vietnamese",
  "description": "string - short description of the path",
  "target_level": "string - one of: beginner, intermediate, advanced",
  "estimated_hours": number - total hours for the whole path,
  "modules": [
    {
      "name_en": "string - week/module title in English",
      "name_vi": "string - week/module title in Vietnamese",
      "order_index": number - 1-based week index,
      "lessons": [
        {
          "name_en": "string - lesson title in English",
          "name_vi": "string - lesson title in Vietnamese",
          "order_index": number - 1-based order in module,
          "lesson_type": "string - always vocabulary (only vocabulary study mode is used for now)",
          "estimated_minutes": number - optional
        }
      ]
    }
  ]
}
Rules:
- Design a short, intensive 7-day English vocabulary learning path.
- Output exactly 7 modules. Each module represents one day in the 7-day path.
- Each module should contain 2–4 lessons. Every lesson is a vocabulary-focused study session (lesson_type = "vocabulary").
- Match content to: user role (student/working/career changer), industry if given, English level, and custom_focus.
- Use only the keys above. Output nothing else but the JSON.`;

const SCHEDULE_7_DAYS_PROMPT = `You are an expert English vocabulary designer. Given a user's survey answers, output a single valid JSON object (no markdown, no code block) with this exact structure:
{
  "name_en": "string - 7-day schedule title in English",
  "name_vi": "string - 7-day schedule title in Vietnamese",
  "description": "string - short description",
  "days": [
    {
      "day_index": number - 1 to 7,
      "name_en": "string - e.g. Day 1",
      "name_vi": "string - e.g. Ngày 1",
      "order_index": number - 1 to 7,
      "vocabulary": [
        {
          "word": "string - English word",
          "phonetic": "string - IPA or optional",
          "part_of_speech": "string - e.g. noun, verb",
          "definition_en": "string - English definition",
          "definition_vi": "string - Vietnamese definition",
          "difficulty_level": "string - e.g. A1, B2",
          "domain": "string - one of: general, business, technology, science, medical, legal, marketing, finance, education",
          "usage_example_en": "string - one example sentence in English using the word",
          "usage_example_vi": "string - Vietnamese translation of the example sentence"
        }
      ]
    }
  ]
}
Rules:
- Output exactly 7 days. Each day should have 5 to 8 vocabulary items by default.
- If user prompt specifies a target vocabulary count/day, prioritize that target and keep it consistent across all 7 days.
- Every vocabulary item must have: word, domain, usage_example_en, usage_example_vi. Other fields can be empty string if not applicable.
- Match content to: user role, industry if given, English level, custom_focus.
- Use only the keys above. Output nothing else but the JSON.`;

/** Trích một object JSON từ text (bỏ markdown / lời dẫn trước-sau). */
function extractJsonObjectFromText(content: string): string {
    const trimmed = content.trim();
    const start = trimmed.indexOf("{");
    if (start === -1) {
        throw new Error("OpenAI response does not contain JSON object");
    }
    const end = trimmed.lastIndexOf("}");
    if (end <= start) {
        throw new Error("OpenAI response JSON is incomplete");
    }
    return trimmed.slice(start, end + 1);
}

/**
 * Chuẩn hoá payload lịch 7 ngày: model đôi khi dùng key khác (words, items) hoặc
 * mảng vocabulary rỗng — cần map về đúng cấu trúc trước khi lưu DB.
 */
function normalizeSchedule7DaysPayload(
    raw: Record<string, unknown>,
): GeneratedSchedule7DaysPayload {
    let daysUnknown = raw.days as unknown;
    if (
        !Array.isArray(daysUnknown) &&
        raw.schedule &&
        Array.isArray(raw.schedule)
    ) {
        daysUnknown = raw.schedule;
    }
    if (!Array.isArray(daysUnknown)) {
        throw new Error(
            "Invalid OpenAI schedule: missing days array (expected days or schedule)",
        );
    }

    const days: GeneratedScheduleDay[] = (
        daysUnknown as Record<string, unknown>[]
    ).map((day, idx) => {
        const vocabRaw =
            day.vocabulary ??
            day.words ??
            day.vocab_list ??
            day.items ??
            day.vocabularies;
        const list: unknown[] = Array.isArray(vocabRaw) ? vocabRaw : [];

        const vocabulary: GeneratedDayVocab[] = list
            .map((item): GeneratedDayVocab | null => {
                if (!item || typeof item !== "object") {
                    return null;
                }
                const o = item as Record<string, unknown>;
                const word =
                    typeof o.word === "string"
                        ? o.word.trim()
                        : typeof o.term === "string"
                          ? o.term.trim()
                          : "";
                if (!word) {
                    return null;
                }
                return {
                    word,
                    phonetic:
                        typeof o.phonetic === "string"
                            ? o.phonetic
                            : typeof o.pronunciation === "string"
                              ? o.pronunciation
                              : typeof o.ipa === "string"
                                ? o.ipa
                                : typeof o.pronunciation_ipa === "string"
                                  ? o.pronunciation_ipa
                                  : undefined,
                    part_of_speech:
                        typeof o.part_of_speech === "string"
                            ? o.part_of_speech
                            : undefined,
                    definition_en:
                        typeof o.definition_en === "string"
                            ? o.definition_en
                            : undefined,
                    definition_vi:
                        typeof o.definition_vi === "string"
                            ? o.definition_vi
                            : undefined,
                    difficulty_level:
                        typeof o.difficulty_level === "string"
                            ? o.difficulty_level
                            : undefined,
                    domain: o.domain as GeneratedDayVocab["domain"],
                    usage_example_en:
                        typeof o.usage_example_en === "string"
                            ? o.usage_example_en
                            : typeof o.example_sentence === "string"
                              ? o.example_sentence
                              : "",
                    usage_example_vi:
                        typeof o.usage_example_vi === "string"
                            ? o.usage_example_vi
                            : "",
                };
            })
            .filter((x): x is GeneratedDayVocab => x !== null);

        return {
            day_index:
                typeof day.day_index === "number" ? day.day_index : idx + 1,
            name_en:
                typeof day.name_en === "string"
                    ? day.name_en
                    : `Day ${idx + 1}`,
            name_vi:
                typeof day.name_vi === "string"
                    ? day.name_vi
                    : `Ngày ${idx + 1}`,
            order_index:
                typeof day.order_index === "number" ? day.order_index : idx + 1,
            vocabulary,
        };
    });

    if (days.length !== 7) {
        throw new Error(
            `Invalid OpenAI schedule: expected exactly 7 days, got ${days.length}`,
        );
    }

    const totalVocab = days.reduce((s, d) => s + d.vocabulary.length, 0);
    if (totalVocab === 0) {
        throw new Error(
            "Invalid OpenAI schedule: no vocabulary words in any day (empty or wrong JSON keys).",
        );
    }

    return {
        name_en:
            typeof raw.name_en === "string" ? raw.name_en : "7-Day schedule",
        name_vi: typeof raw.name_vi === "string" ? raw.name_vi : "Lịch 7 ngày",
        description:
            typeof raw.description === "string" ? raw.description : undefined,
        days,
    };
}

@Injectable()
export class OpenAILearningPathService {
    private readonly apiKey: string;
    private readonly baseURL = "https://api.openai.com/v1";

    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY ?? "";
    }

    isConfigured(): boolean {
        return Boolean(this.apiKey);
    }

    async generateLearningPath(
        context: SurveyContextForAI,
    ): Promise<GeneratedLearningPathPayload> {
        if (!this.apiKey) {
            throw new Error("OPENAI_API_KEY is not configured");
        }

        const userPrompt = [
            "Design a 7-day intensive English vocabulary learning path with the following survey data:",
            context.current_status &&
                `- Current role: ${context.current_status}`,
            context.industry_name &&
                `- Industry/field: ${context.industry_name}`,
            context.english_level &&
                `- Current English level: ${context.english_level}`,
            context.daily_learning_minutes &&
                `- Daily study time: ${context.daily_learning_minutes} minutes`,
            context.custom_focus &&
                `- Custom focus/goals: ${context.custom_focus}`,
            context.custom_focus_2 &&
                `- Additional focus: ${context.custom_focus_2}`,
            context.course_duration_weeks &&
                `- Course duration: ${context.course_duration_weeks} weeks`,
        ]
            .filter(Boolean)
            .join("\n");

        const response = await axios.post<{
            choices?: Array<{ message?: { content?: string } }>;
        }>(
            `${this.baseURL}/chat/completions`,
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userPrompt },
                ],
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json",
                },
                timeout: 360000,
            },
        );

        const content =
            response.data?.choices?.[0]?.message?.content?.trim() ?? "";
        const jsonStr = content
            .replace(/^```json\s*/i, "")
            .replace(/\s*```$/i, "");
        const parsed = JSON.parse(jsonStr) as GeneratedLearningPathPayload;

        if (!parsed.modules || !Array.isArray(parsed.modules)) {
            throw new Error("Invalid OpenAI response: missing modules array");
        }
        return parsed;
    }

    async generateSchedule7Days(
        context: SurveyContextForAI,
    ): Promise<GeneratedSchedule7DaysPayload> {
        if (!this.apiKey) {
            throw new Error("OPENAI_API_KEY is not configured");
        }

        const dailyMinutes = Number(context.daily_learning_minutes ?? 15);
        const targetWordsPerDay =
            dailyMinutes >= 30
                ? 8
                : dailyMinutes >= 20
                  ? 6
                  : dailyMinutes >= 15
                    ? 5
                    : 4;

        const userPrompt = [
            "Design a 7-day vocabulary schedule with the following survey data:",
            context.current_status &&
                `- Current role: ${context.current_status}`,
            context.industry_name &&
                `- Industry/field: ${context.industry_name}`,
            context.english_level &&
                `- Current English level: ${context.english_level}`,
            context.daily_learning_minutes &&
                `- Daily study time: ${context.daily_learning_minutes} minutes`,
            context.custom_focus &&
                `- Custom focus/goals: ${context.custom_focus}`,
            context.custom_focus_2 &&
                `- Additional focus: ${context.custom_focus_2}`,
            context.course_duration_weeks &&
                `- Course duration: ${context.course_duration_weeks} weeks`,
            `- Vocabulary target per day: exactly ${targetWordsPerDay} words (keep all 7 days consistent)`,
        ]
            .filter(Boolean)
            .join("\n");

        const response = await axios.post<{
            choices?: Array<{ message?: { content?: string } }>;
        }>(
            `${this.baseURL}/chat/completions`,
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: SCHEDULE_7_DAYS_PROMPT },
                    { role: "user", content: userPrompt },
                ],
                temperature: 0.7,
                response_format: { type: "json_object" },
            },
            {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json",
                },
                timeout: 360000,
            },
        );

        const content =
            response.data?.choices?.[0]?.message?.content?.trim() ?? "";
        const jsonStr = content
            .replace(/^```json\s*/i, "")
            .replace(/\s*```$/i, "");
        let rawParsed: Record<string, unknown>;
        try {
            rawParsed = JSON.parse(jsonStr) as Record<string, unknown>;
        } catch {
            rawParsed = JSON.parse(
                extractJsonObjectFromText(content),
            ) as Record<string, unknown>;
        }

        return normalizeSchedule7DaysPayload(rawParsed);
    }

    async translateToVietnamese(text: string): Promise<string> {
        if (!this.apiKey) {
            throw new Error("OPENAI_API_KEY is not configured");
        }

        const response = await axios.post<{
            choices?: Array<{ message?: { content?: string } }>;
        }>(
            `${this.baseURL}/chat/completions`,
            {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a professional English-to-Vietnamese translator. Translate accurately and naturally. Keep the meaning.",
                    },
                    {
                        role: "user",
                        content: `Translate this into Vietnamese:\n\n${text}`,
                    },
                ],
                temperature: 0,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json",
                },
                timeout: 360000,
            },
        );

        const content =
            response.data?.choices?.[0]?.message?.content?.trim() ?? "";
        // Tránh trường hợp model trả về câu trả lời kèm dấu ngoặc/quote
        return content.replace(/^"|"$/g, "").trim();
    }
}
