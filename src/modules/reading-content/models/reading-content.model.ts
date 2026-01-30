import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { ReadingContent } from "../entities/reading-content.entity";
import { IndustryModel } from "../../industry/models/industry.model";

@Table({
    tableName: "reading_contents",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class ReadingContentModel extends Model implements ReadingContent {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "content_id",
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
        field: "content_type",
    })
    content_type?: string;

    @ForeignKey(() => IndustryModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "industry_id",
    })
    industry_id?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: "content_text",
    })
    content_text: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
        field: "difficulty_level",
    })
    difficulty_level?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "created_at",
    })
    createdAt?: Date;
}
