export enum VocabularyDomain {
    GENERAL = "general",
    BUSINESS = "business",
    TECHNOLOGY = "technology",
    SCIENCE = "science",
    MEDICAL = "medical",
    LEGAL = "legal",
    MARKETING = "marketing",
    FINANCE = "finance",
    EDUCATION = "education",
}

const DOMAIN_VALUES = new Set<string>(Object.values(VocabularyDomain));

/** Chuẩn hoá domain từ OpenAI (tránh sai enum → validation create lỗi). */
export function parseVocabularyDomain(input?: string | null): VocabularyDomain {
    if (input == null || String(input).trim() === "") {
        return VocabularyDomain.GENERAL;
    }
    const v = String(input).toLowerCase().trim();
    if (DOMAIN_VALUES.has(v)) {
        return v as VocabularyDomain;
    }
    return VocabularyDomain.GENERAL;
}
