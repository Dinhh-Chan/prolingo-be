import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString } from "class-validator";

export class ExerciseIndustry implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Exercise ID", required: true })
    exercise_id: string;

    @IsString()
    @EntityDefinition.field({ label: "Industry ID", required: true })
    industry_id: string;
}
