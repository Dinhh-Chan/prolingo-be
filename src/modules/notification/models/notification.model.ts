import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { NotificationUser } from "../entities/notification.entity";
import { UserModel } from "@module/repository/sequelize/model/user.model";

@Table({
    tableName: "notifications",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class NotificationUserModel extends Model implements NotificationUser {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "notification_id",
    })
    _id: string;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    type?: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: true,
    })
    title?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    message?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_read",
    })
    is_read?: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "created_at",
    })
    createdAt?: Date;
}
