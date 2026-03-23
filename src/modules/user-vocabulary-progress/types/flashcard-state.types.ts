/** Trạng thái flashcard theo từ (dùng enrich lesson-vocabulary). */
export interface FlashcardVocabState {
    flashcard_remembered_count: number;
    /** true khi đã đủ ngưỡng swipe "đã nhớ" (mặc định 5). */
    is_remembered: boolean;
}
