import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    Unique,
} from "sequelize-typescript";
import { UserSkillStat } from "../entities/user-skill-stat.entity";
import { User } from "../../user/entities/user.entity";

@Table({
    tableName: "user_skill_stats",
    timestamps: true,
    createdAt: false,
    updatedAt: "last_updated",
    indexes: [
        {
            unique: true,
            fields: ["user_id", "skill_category"],
        },
    ],
})
export class UserSkillStatModel extends Model implements UserSkillStat {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "stat_id",
    })
    _id: string;

    @Unique("user_skill_unique")
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @Unique("user_skill_unique")
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "skill_category",
    })
    skill_category?: string;

    @Column({
        type: DataType.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0,
        field: "average_score",
    })
    average_score?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "confidence_level",
    })
    confidence_level?: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "last_updated",
    })
    createdAt?: Date;
}
