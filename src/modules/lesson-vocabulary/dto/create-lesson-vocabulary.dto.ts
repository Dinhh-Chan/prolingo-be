import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonVocabularyDto {
    @ApiProperty({ description: "Lesson ID" })
    @IsString()
    @IsNotEmpty({ message: "Lesson ID không được để trống" })
    @EntityDefinition.field({ label: "Lesson ID", required: true })
    lesson_id: string;

    @ApiProperty({ description: "Vocabulary ID" })
    @IsString()
    @IsNotEmpty({ message: "Vocabulary ID không được để trống" })
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocab_id: string;

    @ApiProperty({ description: "Thứ tự", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thứ tự" })
    order_index?: number;
}
