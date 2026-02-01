import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    Unique,
} from "sequelize-typescript";
import { UserDailyActivity } from "../entities/user-daily-activity.entity";
import { UserModel } from "@module/repository/sequelize/model/user.model";

@Table({
    tableName: "user_daily_activities",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["user_id", "activity_date"],
        },
    ],
})
export class UserDailyActivityModel extends Model implements UserDailyActivity {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "activity_id",
    })
    _id: string;

    @Unique("user_date_unique")
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @Unique("user_date_unique")
    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
        field: "activity_date",
    })
    activity_date: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "exercises_completed",
    })
    exercises_completed?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "time_spent_minutes",
    })
    time_spent_minutes?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "points_earned",
    })
    points_earned?: number;
}
