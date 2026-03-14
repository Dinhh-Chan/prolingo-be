import { ApiProperty } from "@nestjs/swagger";

export class SurveyEnglishLevelOptionDto {
    @ApiProperty() value: string;
    @ApiProperty() label: string;
    @ApiProperty() description: string;
}
