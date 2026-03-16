import { Injectable } from "@nestjs/common";
import axios from "axios";
import {
    GeneratedLearningPathPayload,
    GeneratedSchedule7DaysPayload,
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
          "usage_example_en": "string - exactly one example sentence in English using the word",
          "usage_example_vi": "string - Vietnamese translation of the example sentence"
        }
      ]
    }
  ]
}
Rules:
- Output exactly 7 days.
- For each day, output exactly 10 vocabulary items in the "vocabulary" array.
- The application will later split each day's 10 vocabulary items into 2 learning modules with 5 new words per module, so make sure the 10 words of a day form a coherent theme.
- Every vocabulary item must have: "word", "usage_example_en", "usage_example_vi". Other fields can be empty string if not applicable.
- Match content to: user role, industry if given, English level, custom_focus.
- Use only the keys above. Output nothing else but the JSON.`;

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
                timeout: 60000,
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
            },
            {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json",
                },
                timeout: 60000,
            },
        );

        const content =
            response.data?.choices?.[0]?.message?.content?.trim() ?? "";
        const jsonStr = content
            .replace(/^```json\s*/i, "")
            .replace(/\s*```$/i, "");
        const parsed = JSON.parse(jsonStr) as GeneratedSchedule7DaysPayload;

        if (
            !parsed.days ||
            !Array.isArray(parsed.days) ||
            parsed.days.length !== 7
        ) {
            throw new Error(
                "Invalid OpenAI response: must have exactly 7 days",
            );
        }
        return parsed;
    }
}
