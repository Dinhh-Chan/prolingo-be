import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { SpeakingDialogue } from "../entities/speaking-dialogue.entity";
import { SpeakingScenarioModel } from "../../speaking-scenario/models/speaking-scenario.model";

@Table({
    tableName: "speaking_dialogues",
    timestamps: false,
})
export class SpeakingDialogueModel extends Model implements SpeakingDialogue {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "dialogue_id",
    })
    _id: string;

    @ForeignKey(() => SpeakingScenarioModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "scenario_id",
    })
    scenario_id: string;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
        field: "dialogue_data",
    })
    dialogue_data: any;
}
