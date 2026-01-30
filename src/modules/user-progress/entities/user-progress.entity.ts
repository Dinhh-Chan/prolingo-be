import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    MaxLength,
} from "class-validator";

export class UserProgress implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Path ID" })
    path_id?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Module ID" })
    module_id?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Lesson ID" })
    lesson_id?: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Trạng thái" })
    status?: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Phần trăm hoàn thành" })
    completion_percentage?: number;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời điểm bắt đầu" })
    started_at?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời điểm hoàn thành" })
    completed_at?: string;

    updatedAt?: Date;
}
