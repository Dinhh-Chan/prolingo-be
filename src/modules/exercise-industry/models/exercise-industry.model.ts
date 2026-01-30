import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    PrimaryKey,
} from "sequelize-typescript";
import { ExerciseIndustry } from "../entities/exercise-industry.entity";
import { ExerciseModel } from "../../exercise/models/exercise.model";
import { IndustryModel } from "../../industry/models/industry.model";

@Table({
    tableName: "exercise_industries",
    timestamps: false,
})
export class ExerciseIndustryModel extends Model implements ExerciseIndustry {
    @PrimaryKey
    @ForeignKey(() => ExerciseModel)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        field: "exercise_id",
    })
    exercise_id: string;

    @PrimaryKey
    @ForeignKey(() => IndustryModel)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
        field: "industry_id",
    })
    industry_id: string;

    @StrObjectId()
    get _id(): string {
        return this.exercise_id;
    }
}
