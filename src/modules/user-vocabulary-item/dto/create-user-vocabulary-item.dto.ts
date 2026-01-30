import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserVocabularyItemDto {
    @ApiProperty({ description: "Set ID" })
    @IsString()
    @IsNotEmpty({ message: "Set ID không được để trống" })
    @EntityDefinition.field({ label: "Set ID", required: true })
    set_id: string;

    @ApiProperty({ description: "Vocabulary ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Vocabulary ID" })
    vocab_id?: string;

    @ApiProperty({
        description: "Từ tùy chỉnh (nếu user tự thêm)",
        maxLength: 200,
        required: false,
    })
    @IsString()
    @MaxLength(200)
    @IsOptional()
    @EntityDefinition.field({ label: "Từ tùy chỉnh" })
    custom_word?: string;

    @ApiProperty({ description: "Câu được AI tạo", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Câu được AI tạo" })
    ai_generated_sentence?: string;

    @ApiProperty({
        description: "URL audio AI",
        maxLength: 500,
        required: false,
    })
    @IsString()
    @MaxLength(500)
    @IsOptional()
    @EntityDefinition.field({ label: "URL audio AI" })
    ai_audio_url?: string;
}
