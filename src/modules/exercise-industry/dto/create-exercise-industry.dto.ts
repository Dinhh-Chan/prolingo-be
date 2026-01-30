import { IsString, IsNotEmpty } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExerciseIndustryDto {
    @ApiProperty({ description: "Exercise ID" })
    @IsString()
    @IsNotEmpty({ message: "Exercise ID không được để trống" })
    @EntityDefinition.field({ label: "Exercise ID", required: true })
    exercise_id: string;

    @ApiProperty({ description: "Industry ID" })
    @IsString()
    @IsNotEmpty({ message: "Industry ID không được để trống" })
    @EntityDefinition.field({ label: "Industry ID", required: true })
    industry_id: string;
}
