import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateConceptVocabularyDto {
    @ApiProperty({ description: "Concept ID" })
    @IsString()
    @IsNotEmpty({ message: "Concept ID không được để trống" })
    @EntityDefinition.field({ label: "Concept ID", required: true })
    concept_id: string;

    @ApiProperty({ description: "Vocabulary ID" })
    @IsString()
    @IsNotEmpty({ message: "Vocabulary ID không được để trống" })
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocab_id: string;

    @ApiProperty({
        description: "Loại quan hệ (core, related, synonym, antonym)",
        maxLength: 50,
        required: false,
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại quan hệ" })
    relationship_type?: string;
}
