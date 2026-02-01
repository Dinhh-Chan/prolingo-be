import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    Unique,
} from "sequelize-typescript";
import { UserVocabularyProgress } from "../entities/user-vocabulary-progress.entity";
import { UserModel } from "@module/repository/sequelize/model/user.model";
import { VocabularyModel } from "../../vocabulary/models/vocabulary.model";

@Table({
    tableName: "user_vocabulary_progress",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
        {
            unique: true,
            fields: ["user_id", "vocab_id"],
        },
    ],
})
export class UserVocabularyProgressModel
    extends Model
    implements UserVocabularyProgress
{
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "progress_id",
    })
    _id: string;

    @Unique("user_vocab_unique")
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @Unique("user_vocab_unique")
    @ForeignKey(() => VocabularyModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "vocab_id",
    })
    vocab_id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "mastery_level",
    })
    mastery_level?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "times_practiced",
    })
    times_practiced?: number;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: "last_practiced",
    })
    last_practiced?: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: "next_review",
    })
    next_review?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_mastered",
    })
    is_mastered?: boolean;

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
