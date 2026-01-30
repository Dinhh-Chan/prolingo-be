import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class UserVocabularyProgress implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocab_id: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Độ thành thạo (0-100)" })
    mastery_level?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Số lần luyện tập" })
    times_practiced?: number;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lần luyện tập cuối" })
    last_practiced?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lần ôn tập tiếp theo" })
    next_review?: string;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Đã thành thạo" })
    is_mastered?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}
