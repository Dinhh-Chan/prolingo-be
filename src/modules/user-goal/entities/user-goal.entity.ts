import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsString,
    IsOptional,
    IsBoolean,
    IsNumber,
    MaxLength,
} from "class-validator";

export class UserGoal implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @MaxLength(50)
    @EntityDefinition.field({ label: "Loại mục tiêu", required: true })
    goal_type: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Certification ID" })
    certification_id?: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm mục tiêu" })
    target_score?: number;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày mục tiêu" })
    target_date?: string;

    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Mục tiêu chính" })
    is_primary?: boolean;
}
