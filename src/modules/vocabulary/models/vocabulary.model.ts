import { StrObjectId } from "@common/constant";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Vocabulary } from "../entities/vocabulary.entity";

@Table({
    tableName: "vocabulary",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class VocabularyModel extends Model implements Vocabulary {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "vocab_id",
    })
    _id: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    word: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: true,
    })
    phonetic?: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "part_of_speech",
    })
    part_of_speech?: string;

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
        type: DataType.STRING(500),
        allowNull: true,
        field: "audio_url",
    })
    audio_url?: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
        field: "image_url",
    })
    image_url?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "created_at",
    })
    createdAt?: Date;
}
