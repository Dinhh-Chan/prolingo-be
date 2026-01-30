import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";

export class Exercise implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "Type ID không được để trống" })
    @EntityDefinition.field({ label: "Type ID", required: true })
    type_id: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Concept ID" })
    concept_id?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Vocabulary ID" })
    vocab_id?: string;

    @IsString()
    @MaxLength(300)
    @IsOptional()
    @EntityDefinition.field({ label: "Tiêu đề" })
    title?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Hướng dẫn (tiếng Anh)" })
    instruction_en?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Hướng dẫn (tiếng Việt)" })
    instruction_vi?: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Mức độ khó" })
    difficulty_level?: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Danh mục kỹ năng" })
    skill_category?: string;

    @IsString()
    @IsNotEmpty({ message: "Nội dung bài tập không được để trống" })
    @EntityDefinition.field({
        label: "Nội dung bài tập (JSONB)",
        required: true,
    })
    content: any;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời lượng (giây)" })
    duration_seconds?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm số" })
    points?: number;

    createdAt?: Date;
    updatedAt?: Date;
}
