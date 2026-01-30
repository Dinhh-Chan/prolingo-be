import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { JobRole } from "../entities/job-role.entity";
import { IndustryModel } from "../../industry/models/industry.model";

@Table({
    tableName: "job_roles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class JobRoleModel extends Model implements JobRole {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "role_id",
    })
    _id: string;

    @ForeignKey(() => IndustryModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "industry_id",
    })
    industry_id: string;

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
