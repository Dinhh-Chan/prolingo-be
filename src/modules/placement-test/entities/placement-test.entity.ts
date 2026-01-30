import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, IsNumber, MaxLength } from "class-validator";

export class PlacementTest implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm nghe" })
    listening_score?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm từ vựng" })
    vocabulary_score?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm nói" })
    speaking_score?: number;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Trình độ tổng thể" })
    overall_level?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày thi" })
    test_date?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Đề xuất" })
    recommendations?: any;
}
