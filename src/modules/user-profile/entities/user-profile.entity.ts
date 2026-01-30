import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, MaxLength } from "class-validator";

export class UserProfile implements BaseEntity {
    @StrObjectId()
    _id: string;

    /**
     * User ID
     */
    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    /**
     * Industry ID
     */
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    /**
     * Role ID
     */
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Role ID" })
    role_id?: string;

    /**
     * Trạng thái hiện tại
     */
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Trạng thái hiện tại" })
    current_status?: string;

    /**
     * Trình độ tiếng Anh
     */
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Trình độ tiếng Anh" })
    english_level?: string;

    /**
     * Ngày cập nhật
     */
    updatedAt?: Date;
}
