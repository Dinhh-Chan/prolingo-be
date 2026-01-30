import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, MaxLength } from "class-validator";

export class UserVocabularyItem implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Set ID", required: true })
    set_id: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Vocabulary ID" })
    vocab_id?: string;

    @IsString()
    @MaxLength(200)
    @IsOptional()
    @EntityDefinition.field({ label: "Từ tùy chỉnh" })
    custom_word?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Câu được AI tạo" })
    ai_generated_sentence?: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL audio AI" })
    ai_audio_url?: string;
}
