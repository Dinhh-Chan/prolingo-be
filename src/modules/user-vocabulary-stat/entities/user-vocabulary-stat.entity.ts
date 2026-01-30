import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class UserVocabularyStat implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Certification ID" })
    certification_id?: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Tổng từ vựng" })
    total_vocabulary?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Từ vựng đã thành thạo" })
    mastered_vocabulary?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Phần trăm bao phủ" })
    coverage_percentage?: number;

    createdAt?: Date;
}
