import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    PrimaryKey,
} from "sequelize-typescript";
import { LessonExercise } from "../entities/lesson-exercise.entity";
import { LessonModel } from "../../lesson/models/lesson.model";
import { ExerciseModel } from "../../exercise/models/exercise.model";

@Table({
    tableName: "lesson_exercises",
    timestamps: false,
})
export class LessonExerciseModel extends Model implements LessonExercise {
    @PrimaryKey
    @ForeignKey(() => LessonModel)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        field: "lesson_id",
    })
    lesson_id: string;

    @PrimaryKey
    @ForeignKey(() => ExerciseModel)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
        field: "exercise_id",
    })
    exercise_id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "order_index",
    })
    order_index?: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_required",
    })
    is_required?: boolean;

    @StrObjectId()
    get _id(): string {
        return this.lesson_id;
    }
}
