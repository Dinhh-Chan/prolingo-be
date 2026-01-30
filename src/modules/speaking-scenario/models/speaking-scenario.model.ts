import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { SpeakingScenario } from "../entities/speaking-scenario.entity";
import { IndustryModel } from "../../industry/models/industry.model";

@Table({
    tableName: "speaking_scenarios",
    timestamps: false,
})
export class SpeakingScenarioModel extends Model implements SpeakingScenario {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "scenario_id",
    })
    _id: string;

    @Column({
        type: DataType.STRING(300),
        allowNull: false,
    })
    title: string;

    @ForeignKey(() => IndustryModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "industry_id",
    })
    industry_id?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "situation_description",
    })
    situation_description?: string;
}
