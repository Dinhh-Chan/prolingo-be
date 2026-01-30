import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateConceptCertificationDto {
    @ApiProperty({ description: "Concept ID" })
    @IsString()
    @IsNotEmpty({ message: "Concept ID không được để trống" })
    @EntityDefinition.field({ label: "Concept ID", required: true })
    concept_id: string;

    @ApiProperty({ description: "Certification ID" })
    @IsString()
    @IsNotEmpty({ message: "Certification ID không được để trống" })
    @EntityDefinition.field({ label: "Certification ID", required: true })
    certification_id: string;

    @ApiProperty({
        description: "Tần suất xuất hiện (high, medium, low)",
        maxLength: 20,
        required: false,
    })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Tần suất xuất hiện" })
    frequency?: string;
}
