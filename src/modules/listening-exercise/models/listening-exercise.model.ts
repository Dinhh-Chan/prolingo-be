import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { ListeningExercise } from "../entities/listening-exercise.entity";
import { ListeningContentModel } from "../../listening-content/models/listening-content.model";

@Table({
    tableName: "listening_exercises",
    timestamps: false,
})
export class ListeningExerciseModel extends Model implements ListeningExercise {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "listening_exercise_id",
    })
    _id: string;

    @ForeignKey(() => ListeningContentModel)
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
        allowNull: true,
        field: "time_start",
    })
    time_start?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "time_end",
    })
    time_end?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 10,
    })
    points?: number;
}
