import { StrObjectId } from "@common/constant";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Concept } from "../entities/concept.entity";

@Table({
    tableName: "concepts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})
export class ConceptModel extends Model implements Concept {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "concept_id",
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
        allowNull: true,
        field: "name_vi",
    })
    name_vi?: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
        unique: true,
    })
    slug: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "definition_en",
    })
    definition_en?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "definition_vi",
    })
    definition_vi?: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
        field: "difficulty_level",
    })
    difficulty_level?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "usage_context",
    })
    usage_context?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "created_at",
    })
    createdAt?: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "updated_at",
    })
    updatedAt?: Date;
}
