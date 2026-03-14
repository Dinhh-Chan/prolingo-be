import { ApiProperty } from "@nestjs/swagger";

export class SurveyDailyGoalOptionDto {
    @ApiProperty() value: number;
    @ApiProperty() label: string;
    @ApiProperty() recommended: boolean;
}
