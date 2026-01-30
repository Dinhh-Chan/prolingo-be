import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { ExampleSentence } from "../entities/example-sentence.entity";
import { VocabularyModel } from "../../vocabulary/models/vocabulary.model";

@Table({
    tableName: "example_sentences",
    timestamps: false,
})
export class ExampleSentenceModel extends Model implements ExampleSentence {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "sentence_id",
    })
    _id: string;

    @ForeignKey(() => VocabularyModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "vocab_id",
    })
    vocab_id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: "sentence_en",
    })
    sentence_en: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "sentence_vi",
    })
    sentence_vi?: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
    })
    context?: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
        field: "audio_url",
    })
    audio_url?: string;
}
