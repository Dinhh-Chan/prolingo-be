import { StrObjectId } from "@common/constant";
import {
    BeforeValidate,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { VocabSpeakingContent } from "../entities/vocab-speaking-content.entity";
import { VocabularyModel } from "../../vocabulary/models/vocabulary.model";

@Table({
    tableName: "vocab_speaking_content",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
        {
            unique: true,
            fields: ["scope_key"],
            name: "vocab_speaking_content_scope_key_uq",
        },
        {
            fields: ["vocab_id", "lesson_id", "speaking_level"],
            name: "vocab_speaking_content_vocab_lesson_level_idx",
        },
    ],
})
export class VocabSpeakingContentModel
    extends Model
    implements VocabSpeakingContent
{
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "content_id",
    })
    _id: string;

    @Column({
        type: DataType.STRING(220),
        allowNull: false,
        field: "scope_key",
    })
    scope_key: string;

    @ForeignKey(() => VocabularyModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "vocab_id",
    })
    vocab_id: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: true,
        field: "lesson_id",
    })
    lesson_id?: string;

    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
        field: "speaking_level",
    })
    speaking_level: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: "reference_text",
    })
    reference_text: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: true,
        field: "prompt_version",
    })
    prompt_version?: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: true,
        field: "content_hash",
    })
    content_hash?: string;

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

    @BeforeValidate
    static setScopeKey(instance: VocabSpeakingContentModel): void {
        const lid = instance.lesson_id?.trim() || "";
        instance.scope_key = `${instance.vocab_id}|${lid}|${instance.speaking_level}`;
    }
}
