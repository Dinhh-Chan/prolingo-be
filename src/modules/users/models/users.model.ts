import { StrObjectId } from "@common/constant";
import { Gender, SystemRole } from "@module/user/common/constant";
import { Users } from "../entities/users.entity";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "users",
    timestamps: true,
})
export class UsersModel extends Model implements Users {
    @StrObjectId()
    _id: string;

    @Column({ allowNull: false, unique: true })
    username: string;

    @Column({ allowNull: true })
    password?: string;

    @Column({ allowNull: false, validate: { isEmail: true } })
    email: string;

    @Column({ allowNull: true })
    firstname?: string;

    @Column({ allowNull: true })
    lastname?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    fullname?: string;

    @Column({
        type: DataType.ENUM(...Object.values(Gender)),
        allowNull: true,
    })
    gender?: Gender;

    @Column({ type: DataType.STRING(10), allowNull: true })
    dob?: string;

    @Column({ allowNull: true })
    ssoId?: string;

    @Column({
        type: DataType.ENUM(...Object.values(SystemRole)),
        allowNull: false,
    })
    systemRole: SystemRole;

    @Column({ allowNull: true })
    dataPartitionCode?: string;
}
