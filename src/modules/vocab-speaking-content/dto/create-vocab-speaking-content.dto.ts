import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateVocabSpeakingContentDto {
    @ApiProperty({ description: "Vocabulary ID" })
    @IsString()
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocab_id: string;

    @ApiProperty({ description: "Lesson ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lesson ID" })
    lesson_id?: string;

    @ApiProperty({ description: "3 hoặc 4", enum: [3, 4] })
    @IsInt()
    @Min(3)
    @Max(4)
    @EntityDefinition.field({ label: "Speaking level (3|4)", required: true })
    speaking_level: number;

    @ApiProperty({ description: "Reference text" })
    @IsString()
    @EntityDefinition.field({
        label: "Reference text",
        required: true,
    })
    reference_text: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Phiên bản prompt AI" })
    prompt_version?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Hash nội dung" })
    content_hash?: string;
}
