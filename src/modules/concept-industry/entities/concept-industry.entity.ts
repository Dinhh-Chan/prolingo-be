import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, IsNumber } from "class-validator";

export class ConceptIndustry implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Concept ID", required: true })
    concept_id: string;

    @IsString()
    @EntityDefinition.field({ label: "Industry ID", required: true })
    industry_id: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Độ liên quan (1-10)" })
    relevance_score?: number;
}
