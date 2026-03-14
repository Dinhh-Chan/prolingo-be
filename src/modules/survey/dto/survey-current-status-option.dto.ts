import { ApiProperty } from "@nestjs/swagger";

export class SurveyCurrentStatusOptionDto {
    @ApiProperty() value: string;
    @ApiProperty() labelEn: string;
    @ApiProperty() labelVi: string;
    @ApiProperty() descriptionEn: string;
}
