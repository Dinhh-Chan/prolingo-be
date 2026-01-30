import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { SpeakingExercise } from "../entities/speaking-exercise.entity";
import { SpeakingScenarioModel } from "../../speaking-scenario/models/speaking-scenario.model";

@Table({
    tableName: "speaking_exercises",
    timestamps: false,
})
export class SpeakingExerciseModel extends Model implements SpeakingExercise {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "speaking_exercise_id",
    })
    _id: string;

    @ForeignKey(() => SpeakingScenarioModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "scenario_id",
    })
    scenario_id?: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "exercise_type",
    })
    exercise_type?: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
        field: "reference_audio_url",
    })
    reference_audio_url?: string;
}
