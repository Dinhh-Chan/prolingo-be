import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsNotEmpty } from "class-validator";

export class SpeakingDialogue implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "Scenario ID không được để trống" })
    @EntityDefinition.field({ label: "Scenario ID", required: true })
    scenario_id: string;

    @IsString()
    @IsNotEmpty({ message: "Dữ liệu hội thoại không được để trống" })
    @EntityDefinition.field({
        label: "Dữ liệu hội thoại (JSONB)",
        required: true,
    })
    dialogue_data: any;
}
