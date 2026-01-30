import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSpeakingScenarioDto {
    @ApiProperty({ description: "Tiêu đề", maxLength: 300 })
    @IsString()
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @MaxLength(300)
    @EntityDefinition.field({ label: "Tiêu đề", required: true })
    title: string;

    @ApiProperty({ description: "Industry ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    @ApiProperty({ description: "Mô tả tình huống", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả tình huống" })
    situation_description?: string;
}
