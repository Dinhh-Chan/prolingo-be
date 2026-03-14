import { ApiProperty } from "@nestjs/swagger";

export class JobRoleOptionDto {
    @ApiProperty() _id: string;
    @ApiProperty() industry_id: string;
    @ApiProperty() name_en: string;
    @ApiProperty() name_vi: string;
    @ApiProperty() slug: string;
}
