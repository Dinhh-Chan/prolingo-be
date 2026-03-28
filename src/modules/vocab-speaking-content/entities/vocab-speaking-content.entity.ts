import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

/** Nội dung speaking cố định cho L3–L4 (tình huống ngắn theo bảng level). */
export class VocabSpeakingContent implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Scope key (lookup)" })
    scope_key?: string;

    @IsString()
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocab_id: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lesson ID (ngữ cảnh bài)" })
    lesson_id?: string;

    /** 3 hoặc 4 — theo mastery / loại tình huống. */
    @IsInt()
    @Min(3)
    @Max(4)
    @EntityDefinition.field({ label: "Speaking level (3|4)", required: true })
    speaking_level: number;

    @IsString()
    @EntityDefinition.field({
        label: "Reference text (API chấm + hiển thị)",
        required: true,
    })
    reference_text: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Phiên bản prompt AI" })
    prompt_version?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Hash nội dung" })
    content_hash?: string;

    createdAt?: Date;
    updatedAt?: Date;
}
