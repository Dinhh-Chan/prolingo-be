import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { UserSpeakingSubmission } from "../entities/user-speaking-submission.entity";
import { User } from "../../user/entities/user.entity";
import { SpeakingExerciseModel } from "../../speaking-exercise/models/speaking-exercise.model";

@Table({
    tableName: "user_speaking_submissions",
    timestamps: true,
    createdAt: "submitted_at",
    updatedAt: false,
})
export class UserSpeakingSubmissionModel
    extends Model
    implements UserSpeakingSubmission
{
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "submission_id",
    })
    _id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @ForeignKey(() => SpeakingExerciseModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "speaking_exercise_id",
    })
    speaking_exercise_id: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
        field: "audio_url",
    })
    audio_url: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "pronunciation_score",
    })
    pronunciation_score?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "fluency_score",
    })
    fluency_score?: number;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
        field: "ai_feedback",
    })
    ai_feedback?: any;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "submitted_at",
    })
    createdAt?: Date;
}
