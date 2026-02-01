import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { PlacementTest } from "../entities/placement-test.entity";
import { UserModel } from "@module/repository/sequelize/model/user.model";

@Table({
    tableName: "placement_tests",
    timestamps: false,
})
export class PlacementTestModel extends Model implements PlacementTest {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "test_id",
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
        type: DataType.INTEGER,
        allowNull: true,
        field: "listening_score",
    })
    listening_score?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "vocabulary_score",
    })
    vocabulary_score?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "speaking_score",
    })
    speaking_score?: number;

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
        field: "overall_level",
    })
    overall_level?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "test_date",
    })
    test_date?: string;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
    })
    recommendations?: any;
}
