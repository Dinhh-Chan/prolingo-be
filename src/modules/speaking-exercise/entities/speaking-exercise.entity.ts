import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, MaxLength } from "class-validator";

export class SpeakingExercise implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Scenario ID" })
    scenario_id?: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại bài tập" })
    exercise_type?: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL audio tham khảo" })
    reference_audio_url?: string;
}
