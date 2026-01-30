import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { LearningModule } from "../entities/learning-module.entity";
import { LearningPathModel } from "../../learning-path/models/learning-path.model";

@Table({
    tableName: "learning_modules",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class LearningModuleModel extends Model implements LearningModule {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "module_id",
    })
    _id: string;

    @ForeignKey(() => LearningPathModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "path_id",
    })
    path_id: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
        field: "name_en",
    })
    name_en: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
        field: "name_vi",
    })
    name_vi: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "order_index",
    })
    order_index: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "created_at",
    })
    createdAt?: Date;
}
