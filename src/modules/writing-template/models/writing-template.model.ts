import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { WritingTemplate } from "../entities/writing-template.entity";
import { IndustryModel } from "../../industry/models/industry.model";

@Table({
    tableName: "writing_templates",
    timestamps: false,
})
export class WritingTemplateModel extends Model implements WritingTemplate {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "template_id",
    })
    _id: string;

    @Column({
        type: DataType.STRING(300),
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "writing_type",
    })
    writing_type?: string;

    @ForeignKey(() => IndustryModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "industry_id",
    })
    industry_id?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "structure_guide",
    })
    structure_guide?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "example_text",
    })
    example_text?: string;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
        field: "key_phrases",
    })
    key_phrases?: any;
}
