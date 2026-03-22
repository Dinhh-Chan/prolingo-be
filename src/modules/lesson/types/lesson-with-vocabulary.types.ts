import { ExampleSentence } from "@module/example-sentence/entities/example-sentence.entity";
import { Vocabulary } from "@module/vocabulary/entities/vocabulary.entity";
import { Lesson } from "../entities/lesson.entity";

/** Một từ trong lesson + câu ví dụ (GET /lessons/:id). */
export interface LessonVocabularyItem {
    order_index?: number;
    lesson_vocabulary_id: string;
    vocabulary: Vocabulary;
    example_sentences: ExampleSentence[];
}

/** Lesson kèm danh sách từ vựng đã join. */
export type LessonWithVocabulary = Lesson & {
    vocabulary: LessonVocabularyItem[];
};
