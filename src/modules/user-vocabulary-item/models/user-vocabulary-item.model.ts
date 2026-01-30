import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { UserVocabularyItem } from "../entities/user-vocabulary-item.entity";
import { UserVocabularySetModel } from "../../user-vocabulary-set/models/user-vocabulary-set.model";
import { VocabularyModel } from "../../vocabulary/models/vocabulary.model";

@Table({
    tableName: "user_vocabulary_items",
    timestamps: false,
})
export class UserVocabularyItemModel
    extends Model
    implements UserVocabularyItem
{
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "item_id",
    })
    _id: string;

    @ForeignKey(() => UserVocabularySetModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "set_id",
    })
    set_id: string;

    @ForeignKey(() => VocabularyModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "vocab_id",
    })
    vocab_id?: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: true,
        field: "custom_word",
    })
    custom_word?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "ai_generated_sentence",
    })
    ai_generated_sentence?: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
        field: "ai_audio_url",
    })
    ai_audio_url?: string;
}
