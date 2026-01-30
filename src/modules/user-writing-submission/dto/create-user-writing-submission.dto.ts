import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserWritingSubmissionDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({ description: "Writing Exercise ID" })
    @IsString()
    @IsNotEmpty({ message: "Writing Exercise ID không được để trống" })
    @EntityDefinition.field({ label: "Writing Exercise ID", required: true })
    writing_exercise_id: string;

    @ApiProperty({ description: "Nội dung" })
    @IsString()
    @IsNotEmpty({ message: "Nội dung không được để trống" })
    @EntityDefinition.field({ label: "Nội dung", required: true })
    content: string;

    @ApiProperty({ description: "Điểm AI", required: false })
    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm AI" })
    ai_score?: number;

    @ApiProperty({ description: "Phản hồi AI (JSONB)", required: false })
    @IsOptional()
    @EntityDefinition.field({ label: "Phản hồi AI (JSONB)" })
    ai_feedback?: any;

    @ApiProperty({ description: "Phiên bản đề xuất", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Phiên bản đề xuất" })
    suggested_version?: string;
}
