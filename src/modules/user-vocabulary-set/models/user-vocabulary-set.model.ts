import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { UserVocabularySet } from "../entities/user-vocabulary-set.entity";
import { UserModel } from "@module/repository/sequelize/model/user.model";

@Table({
    tableName: "user_vocabulary_sets",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class UserVocabularySetModel extends Model implements UserVocabularySet {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "set_id",
    })
    _id: string;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_public",
    })
    is_public?: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "created_at",
    })
    createdAt?: Date;
}
