import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class SpeakingScenario implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @EntityDefinition.field({ label: "Tiêu đề", required: true })
    title: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Mô tả tình huống" })
    situation_description?: string;
}
