import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/** Payload exercise type (từ GET exercise-types), ví dụ code `speaking_lv1`. */
export class ExerciseTypeRefDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    _id?: string;

    @ApiProperty({ example: "speaking_lv1" })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name_en?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name_vi?: string;
}
