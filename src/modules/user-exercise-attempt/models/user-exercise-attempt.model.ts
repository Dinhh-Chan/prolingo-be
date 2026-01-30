import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { UserExerciseAttempt } from "../entities/user-exercise-attempt.entity";
import { User } from "../../user/entities/user.entity";
import { ExerciseModel } from "../../exercise/models/exercise.model";
import { LessonModel } from "../../lesson/models/lesson.model";

@Table({
    tableName: "user_exercise_attempts",
    timestamps: true,
    createdAt: "attempted_at",
    updatedAt: false,
})
export class UserExerciseAttemptModel
    extends Model
    implements UserExerciseAttempt
{
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "attempt_id",
    })
    _id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @ForeignKey(() => ExerciseModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "exercise_id",
    })
    exercise_id: string;

    @ForeignKey(() => LessonModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "lesson_id",
    })
    lesson_id?: string;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
    })
    answers?: any;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    score?: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        field: "is_correct",
    })
    is_correct?: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "time_spent_seconds",
    })
    time_spent_seconds?: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "attempted_at",
    })
    createdAt?: Date;
}
