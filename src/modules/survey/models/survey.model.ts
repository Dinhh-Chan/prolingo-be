import { StrObjectId } from "@common/constant";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Survey } from "../entities/survey.entity";

@Table({
    tableName: "surveys",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})
export class SurveyModel extends Model implements Survey {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "survey_id",
    })
    _id: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "current_status",
    })
    current_status?: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: true,
        field: "industry_name",
    })
    industry_name?: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: true,
        field: "role_id",
    })
    role_id?: string;

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
        type: DataType.BOOLEAN,
        allowNull: true,
        field: "daily_reminder_enabled",
    })
    daily_reminder_enabled?: boolean;

    @Column({
        type: DataType.STRING(10),
        allowNull: true,
        field: "reminder_time",
    })
    reminder_time?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "custom_focus",
    })
    custom_focus?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "custom_focus_2",
    })
    custom_focus_2?: string;

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
        field: "created_at",
    })
    createdAt?: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "updated_at",
    })
    updatedAt?: Date;
}
