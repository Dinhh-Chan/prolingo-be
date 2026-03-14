import { ApiProperty } from "@nestjs/swagger";

export class SurveyCourseDurationOptionDto {
    @ApiProperty() value: number;
    @ApiProperty() label: string;
}
