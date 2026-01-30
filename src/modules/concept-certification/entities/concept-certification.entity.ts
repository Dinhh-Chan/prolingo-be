import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, MaxLength } from "class-validator";

export class ConceptCertification implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Concept ID", required: true })
    concept_id: string;

    @IsString()
    @EntityDefinition.field({ label: "Certification ID", required: true })
    certification_id: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Tần suất xuất hiện" })
    frequency?: string;
}
