import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { UserSpeakingAttempt } from "../entities/user-speaking-attempt.entity";
import { UserModel } from "@module/repository/sequelize/model/user.model";
import { VocabularyModel } from "../../vocabulary/models/vocabulary.model";

@Table({
    tableName: "user_speaking_attempts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    indexes: [
        {
            fields: ["user_id", "vocab_id"],
            name: "user_speaking_attempts_user_vocab_idx",
        },
        {
            fields: ["lesson_id"],
            name: "user_speaking_attempts_lesson_idx",
        },
    ],
})
export class UserSpeakingAttemptModel
    extends Model
    implements UserSpeakingAttempt
{
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "attempt_id",
    })
    _id: string;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.STRING(64),
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

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
        type: DataType.TEXT,
        allowNull: true,
        field: "audio_url",
    })
    audio_url?: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true,
    })
    score?: number;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
        field: "raw_response",
    })
    raw_response?: Record<string, unknown>;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
    })
    passed?: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "created_at",
    })
    createdAt?: Date;
}
