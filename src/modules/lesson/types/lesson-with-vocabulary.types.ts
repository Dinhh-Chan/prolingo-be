import { ExampleSentence } from "@module/example-sentence/entities/example-sentence.entity";
import { Vocabulary } from "@module/vocabulary/entities/vocabulary.entity";
import { Lesson } from "../entities/lesson.entity";

/** Một từ trong lesson + câu ví dụ (GET /lessons/:id). */
export interface LessonVocabularyItem {
    order_index?: number;
    lesson_vocabulary_id: string;
    /** Audio từ bảng vocabulary (alias để FE dùng nhanh). */
    audio_url?: string;
    /** Câu ví dụ ưu tiên hiển thị nhanh ở lesson detail. */
    sentence_en?: string;
    sentence_vi?: string;
    sentence_audio_url?: string;
    /** Audio trên các câu ví dụ nếu có. */
    example_audio_urls?: string[];
    /** Số lần swipe "đã nhớ" (tối đa theo ngưỡng backend). */
    flashcard_remembered_count?: number;
    /** true khi đủ ngưỡng (mặc định 5 lần đã nhớ). */
    is_remembered?: boolean;
    /** Level flashcard/interval theo spec (1-4). */
    level?: number;
    /** Số lần làm sai tích lũy. */
    wrong_count?: number;
    /** Khoảng cách ôn (ngày). */
    interval_days?: number;
    /** Thời điểm ôn tập tiếp theo. */
    next_review_at?: string | Date | null;
    /** Tag từ yếu. */
    is_weak?: boolean;
    /** Chuỗi đúng liên tiếp để gỡ tag yếu. */
    weak_correct_streak?: number;
    /** Loại quiz chính tương ứng level. */
    quiz_type?: string;
    vocabulary: Vocabulary;
    example_sentences: ExampleSentence[];
}

/** Lesson kèm danh sách từ vựng đã join. */
export type LessonWithVocabulary = Lesson & {
    vocabulary: LessonVocabularyItem[];
};
