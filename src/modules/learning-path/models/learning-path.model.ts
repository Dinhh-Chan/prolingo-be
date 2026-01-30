import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { LearningPath } from "../entities/learning-path.entity";
import { IndustryModel } from "../../industry/models/industry.model";
import { CertificationModel } from "../../certification/models/certification.model";

@Table({
    tableName: "learning_paths",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class LearningPathModel extends Model implements LearningPath {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "path_id",
    })
    _id: string;

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

    @ForeignKey(() => IndustryModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "industry_id",
    })
    industry_id?: string;

    @ForeignKey(() => CertificationModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "certification_id",
    })
    certification_id?: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
        field: "target_level",
    })
    target_level?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "estimated_hours",
    })
    estimated_hours?: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_active",
    })
    is_active?: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "created_at",
    })
    createdAt?: Date;
}
