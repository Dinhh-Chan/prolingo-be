/** Trạng thái flashcard theo từ (dùng enrich lesson-vocabulary). */
export interface FlashcardVocabState {
    flashcard_remembered_count: number;
    /** true khi đã đủ ngưỡng swipe "đã nhớ" (mặc định 5). */
    is_remembered: boolean;

    /** Level flashcard/interval theo spec (1-4). */
    level: number;

    /** Số lần làm sai tích lũy. */
    wrong_count: number;

    /** Khoảng cách ôn (ngày). */
    interval_days: number;

    /** Thời điểm ôn tập tiếp theo. */
    next_review?: string | Date | null;

    /** Tag từ yếu. */
    is_weak: boolean;

    /** Chuỗi đúng khi từ đang ở trạng thái yếu. */
    weak_correct_streak: number;
}
