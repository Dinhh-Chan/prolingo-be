import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { ReadingExercise } from "../entities/reading-exercise.entity";
import { ReadingContentModel } from "../../reading-content/models/reading-content.model";

@Table({
    tableName: "reading_exercises",
    timestamps: false,
})
export class ReadingExerciseModel extends Model implements ReadingExercise {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "reading_exercise_id",
    })
    _id: string;

    @ForeignKey(() => ReadingContentModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "content_id",
    })
    content_id: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "exercise_type",
    })
    exercise_type?: string;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
        field: "question_data",
    })
    question_data: any;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 10,
    })
    points?: number;
}
