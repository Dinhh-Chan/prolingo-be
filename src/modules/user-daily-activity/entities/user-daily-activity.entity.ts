import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class UserDailyActivity implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty({ message: "User ID không được để trống" })
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @IsString()
    @IsNotEmpty({ message: "Ngày hoạt động không được để trống" })
    @EntityDefinition.field({ label: "Ngày hoạt động", required: true })
    activity_date: string;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Số bài tập đã hoàn thành" })
    exercises_completed?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Thời gian học (phút)" })
    time_spent_minutes?: number;

    @IsNumber()
    @IsOptional()
    @EntityDefinition.field({ label: "Điểm đã kiếm được" })
    points_earned?: number;
}
