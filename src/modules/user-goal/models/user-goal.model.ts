import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { UserGoal } from "../entities/user-goal.entity";
import { User } from "../../user/entities/user.entity";
import { CertificationModel } from "../../certification/models/certification.model";

@Table({
    tableName: "user_goals",
    timestamps: false,
})
export class UserGoalModel extends Model implements UserGoal {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "goal_id",
    })
    _id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        field: "goal_type",
    })
    goal_type: string;

    @ForeignKey(() => CertificationModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "certification_id",
    })
    certification_id?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "target_score",
    })
    target_score?: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: true,
        field: "target_date",
    })
    target_date?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_primary",
    })
    is_primary?: boolean;
}
