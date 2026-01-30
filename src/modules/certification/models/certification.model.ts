import { StrObjectId } from "@common/constant";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Certification } from "../entities/certification.entity";

@Table({
    tableName: "certifications",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class CertificationModel extends Model implements Certification {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "certification_id",
    })
    _id: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    code: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "target_score_min",
    })
    target_score_min?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "target_score_max",
    })
    target_score_max?: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_active",
    })
    is_active: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "created_at",
    })
    createdAt?: Date;
}
