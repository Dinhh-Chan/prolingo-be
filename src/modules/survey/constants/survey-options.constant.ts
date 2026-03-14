/**
 * Lựa chọn "Who are you?" - current_status
 */
export const SURVEY_CURRENT_STATUS_OPTIONS = [
    {
        value: "student",
        labelEn: "Student",
        labelVi: "Sinh viên",
        descriptionEn: "Exams, school projects, or studying abroad prep.",
    },
    {
        value: "working",
        labelEn: "Working Professional",
        labelVi: "Người đi làm",
        descriptionEn: "Specialized business English for your career growth.",
    },
    {
        value: "switching_career",
        labelEn: "Career Changer",
        labelVi: "Chuyển đổi nghề nghiệp",
        descriptionEn: "Transitioning industries with new terminology.",
    },
] as const;

/**
 * Cấp độ tiếng Anh (CEFR)
 */
export const SURVEY_ENGLISH_LEVEL_OPTIONS = [
    {
        value: "A1",
        label: "A1 - Beginner",
        description:
            "Understand and use basic phrases; introduce yourself and answer simple personal questions.",
    },
    {
        value: "A2",
        label: "A2 - Elementary",
        description:
            "Communicate in simple, routine tasks; describe aspects of your background and environment.",
    },
    {
        value: "B1",
        label: "B1 - Intermediate",
        description:
            "Handle most situations while traveling; produce simple connected text on topics of personal interest.",
    },
    {
        value: "B2",
        label: "B2 - Upper Intermediate",
        description:
            "Understand complex text on concrete and abstract topics; interact with native speakers fluently.",
    },
    {
        value: "C1",
        label: "C1 - Advanced",
        description:
            "Express ideas fluently and spontaneously; use language flexibly for social and professional purposes.",
    },
    {
        value: "C2",
        label: "C2 - Proficient",
        description:
            "Understand with ease virtually everything heard or read; summarize information from different sources.",
    },
] as const;

/**
 * Mục tiêu học mỗi ngày (phút)
 */
export const SURVEY_DAILY_GOAL_OPTIONS = [
    { value: 10, label: "10 mins / day", recommended: false },
    { value: 15, label: "15 mins / day", recommended: true },
    { value: 20, label: "20 mins / day", recommended: false },
    { value: 30, label: "30 mins / day", recommended: false },
] as const;

/**
 * Thời lượng khóa học (tuần) - Personalize your journey
 */
export const SURVEY_COURSE_DURATION_OPTIONS = [
    { value: 2, label: "Fast (2 weeks)" },
    { value: 4, label: "Standard (4 weeks)" },
    { value: 8, label: "Long (8 weeks)" },
] as const;
