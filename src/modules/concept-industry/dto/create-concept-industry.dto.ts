import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateConceptIndustryDto {
    @ApiProperty({ description: "Concept ID" })
    @IsString()
    @IsNotEmpty({ message: "Concept ID không được để trống" })
    @EntityDefinition.field({ label: "Concept ID", required: true })
    concept_id: string;

    @ApiProperty({ description: "Industry ID" })
    @IsString()
    @IsNotEmpty({ message: "Industry ID không được để trống" })
    @EntityDefinition.field({ label: "Industry ID", required: true })
    industry_id: string;

    @ApiProperty({
        description: "Độ liên quan (1-10)",
        default: 5,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Độ liên quan (1-10)" })
    relevance_score?: number;
}
