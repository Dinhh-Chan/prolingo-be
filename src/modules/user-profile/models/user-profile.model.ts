import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { UserProfile } from "../entities/user-profile.entity";
import { User } from "../../user/entities/user.entity";
import { IndustryModel } from "../../industry/models/industry.model";
import { JobRoleModel } from "../../job-role/models/job-role.model";

@Table({
    tableName: "user_profiles",
    timestamps: true,
    createdAt: false,
    updatedAt: "updated_at",
})
export class UserProfileModel extends Model implements UserProfile {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "profile_id",
    })
    _id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        unique: true,
        field: "user_id",
    })
    user_id: string;

    @ForeignKey(() => IndustryModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "industry_id",
    })
    industry_id?: string;

    @ForeignKey(() => JobRoleModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "role_id",
    })
    role_id?: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "current_status",
    })
    current_status?: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
        field: "english_level",
    })
    english_level?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "updated_at",
    })
    updatedAt?: Date;
}
