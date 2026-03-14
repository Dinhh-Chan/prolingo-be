import { ApiProperty } from "@nestjs/swagger";

export class IndustryOptionDto {
    @ApiProperty() _id: string;
    @ApiProperty() name_en: string;
    @ApiProperty() name_vi: string;
    @ApiProperty() slug: string;
}
