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
    vocabulary: Vocabulary;
    example_sentences: ExampleSentence[];
}

/** Lesson kèm danh sách từ vựng đã join. */
export type LessonWithVocabulary = Lesson & {
    vocabulary: LessonVocabularyItem[];
};
