import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    PrimaryKey,
} from "sequelize-typescript";
import { UserNotificationSetting } from "../entities/user-notification-setting.entity";
import { UserModel } from "@module/repository/sequelize/model/user.model";

@Table({
    tableName: "user_notification_settings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})
export class UserNotificationSettingModel
    extends Model
    implements UserNotificationSetting
{
    @StrObjectId()
    @PrimaryKey
    @ForeignKey(() => UserModel)
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
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "daily_reminder_enabled",
    })
    daily_reminder_enabled?: boolean;

    @Column({
        type: DataType.TIME,
        allowNull: false,
        defaultValue: "20:00:00",
        field: "reminder_time",
    })
    reminder_time?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "email_notifications",
    })
    email_notifications?: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "push_notifications",
    })
    push_notifications?: boolean;

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
