import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { ListeningContent } from "../entities/listening-content.entity";
import { IndustryModel } from "../../industry/models/industry.model";

@Table({
    tableName: "listening_contents",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class ListeningContentModel extends Model implements ListeningContent {
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
        type: DataType.STRING(200),
        allowNull: true,
    })
    topic?: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
        field: "audio_url",
    })
    audio_url?: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
        field: "video_url",
    })
    video_url?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "transcript_en",
    })
    transcript_en?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "transcript_vi",
    })
    transcript_vi?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "duration_seconds",
    })
    duration_seconds?: number;

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
