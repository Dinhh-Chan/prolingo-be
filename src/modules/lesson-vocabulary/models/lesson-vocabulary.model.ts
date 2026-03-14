import { StrObjectId } from "@common/constant";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { LessonVocabulary } from "../entities/lesson-vocabulary.entity";

@Table({
    tableName: "lesson_vocabulary",
    timestamps: false,
})
export class LessonVocabularyModel extends Model implements LessonVocabulary {
    @StrObjectId()
    @Column({
        type: DataType.STRING(64),
        primaryKey: true,
        field: "id",
    })
    _id: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
        field: "lesson_id",
    })
    lesson_id: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
        field: "vocab_id",
    })
    vocab_id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "order_index",
    })
    order_index?: number;
}
