import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsBoolean,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserVocabularyProgressDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({ description: "Vocabulary ID" })
    @IsString()
    @IsNotEmpty({ message: "Vocabulary ID không được để trống" })
    @EntityDefinition.field({ label: "Vocabulary ID", required: true })
    vocab_id: string;

    @ApiProperty({
        description: "Độ thành thạo (0-100)",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Độ thành thạo (0-100)" })
    mastery_level?: number;

    @ApiProperty({
        description: "Số lần luyện tập",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Số lần luyện tập" })
    times_practiced?: number;

    @ApiProperty({ description: "Lần luyện tập cuối", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lần luyện tập cuối" })
    last_practiced?: string;

    @ApiProperty({ description: "Lần ôn tập tiếp theo", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lần ôn tập tiếp theo" })
    next_review?: string;

    @ApiProperty({
        description: "Đã thành thạo",
        default: false,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    @EntityDefinition.field({ label: "Đã thành thạo" })
    is_mastered?: boolean;
}
