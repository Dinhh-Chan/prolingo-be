import { IsString, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSpeakingExerciseDto {
    @ApiProperty({ description: "Scenario ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Scenario ID" })
    scenario_id?: string;

    @ApiProperty({
        description:
            "Loại bài tập (arrange_structure, pronunciation, role_play)",
        maxLength: 50,
        required: false,
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại bài tập" })
    exercise_type?: string;

    @ApiProperty({
        description: "URL audio tham khảo",
        maxLength: 500,
        required: false,
    })
    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL audio tham khảo" })
    reference_audio_url?: string;
}
