import { IsString, IsNotEmpty } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSpeakingDialogueDto {
    @ApiProperty({ description: "Scenario ID" })
    @IsString()
    @IsNotEmpty({ message: "Scenario ID không được để trống" })
    @EntityDefinition.field({ label: "Scenario ID", required: true })
    scenario_id: string;

    @ApiProperty({ description: "Dữ liệu hội thoại (JSONB)", required: true })
    @IsNotEmpty({ message: "Dữ liệu hội thoại không được để trống" })
    @EntityDefinition.field({
        label: "Dữ liệu hội thoại (JSONB)",
        required: true,
    })
    dialogue_data: any;
}
