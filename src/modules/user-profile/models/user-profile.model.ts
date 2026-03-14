import { StrObjectId } from "@common/constant";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { UserProfile } from "../entities/user-profile.entity";

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

    /** user_id: UUID (SQL user) hoặc ObjectId 24-char (MongoDB user) */
    @Column({
        type: DataType.STRING(64),
        allowNull: false,
        unique: true,
        field: "user_id",
    })
    user_id: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: true,
        field: "industry_id",
    })
    industry_id?: string;

    @Column({
        type: DataType.STRING(64),
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
        type: DataType.INTEGER,
        allowNull: true,
        field: "daily_learning_minutes",
    })
    daily_learning_minutes?: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "custom_focus",
    })
    custom_focus?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "course_duration_weeks",
    })
    course_duration_weeks?: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "updated_at",
    })
    updatedAt?: Date;
}
