import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { UserWritingSubmission } from "../entities/user-writing-submission.entity";
import { UserModel } from "@module/repository/sequelize/model/user.model";
import { WritingExerciseModel } from "../../writing-exercise/models/writing-exercise.model";

@Table({
    tableName: "user_writing_submissions",
    timestamps: true,
    createdAt: "submitted_at",
    updatedAt: false,
})
export class UserWritingSubmissionModel
    extends Model
    implements UserWritingSubmission
{
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "submission_id",
    })
    _id: string;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @ForeignKey(() => WritingExerciseModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "writing_exercise_id",
    })
    writing_exercise_id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "ai_score",
    })
    ai_score?: number;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
        field: "ai_feedback",
    })
    ai_feedback?: any;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "suggested_version",
    })
    suggested_version?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "submitted_at",
    })
    createdAt?: Date;
}
