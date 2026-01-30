import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    PrimaryKey,
} from "sequelize-typescript";
import { UserStreak } from "../entities/user-streak.entity";
import { User } from "../../user/entities/user.entity";

@Table({
    tableName: "user_streaks",
    timestamps: false,
})
export class UserStreakModel extends Model implements UserStreak {
    @StrObjectId()
    @PrimaryKey
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        field: "user_id",
    })
    _id: string;

    get user_id(): string {
        return this._id;
    }

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "current_streak",
    })
    current_streak?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "longest_streak",
    })
    longest_streak?: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: true,
        field: "last_activity_date",
    })
    last_activity_date?: string;

    get user_id(): string {
        return this._id;
    }
}
