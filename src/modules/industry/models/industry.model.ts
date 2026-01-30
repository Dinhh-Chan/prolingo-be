import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Industry } from "../entities/industry.entity";

@Table({
    tableName: "industries",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class IndustryModel extends Model implements Industry {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "industry_id",
    })
    _id: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: "name_en",
    })
    name_en: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: "name_vi",
    })
    name_vi: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    slug: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description?: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
        field: "icon_url",
    })
    icon_url?: string;

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
