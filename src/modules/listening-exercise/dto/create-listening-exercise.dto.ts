import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateListeningExerciseDto {
    @ApiProperty({ description: "Content ID" })
    @IsString()
    @IsNotEmpty({ message: "Content ID không được để trống" })
    @EntityDefinition.field({ label: "Content ID", required: true })
    content_id: string;

    @ApiProperty({
        description:
            "Loại bài tập (multiple_choice, true_false, shadowing, dictation)",
        maxLength: 50,
        required: false,
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Loại bài tập" })
    exercise_type?: string;

    @ApiProperty({ description: "Dữ liệu câu hỏi (JSONB)", required: true })
    @IsNotEmpty({ message: "Dữ liệu câu hỏi không được để trống" })
    @EntityDefinition.field({
        label: "Dữ liệu câu hỏi (JSONB)",
        required: true,
    })
    question_data: any;

    @ApiProperty({ description: "Thời điểm bắt đầu", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời điểm bắt đầu" })
    time_start?: number;

    @ApiProperty({ description: "Thời điểm kết thúc", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời điểm kết thúc" })
    time_end?: number;

    @ApiProperty({ description: "Điểm số", default: 10, required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm số" })
    points?: number;
}
