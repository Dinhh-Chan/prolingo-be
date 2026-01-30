import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { WritingExercise } from "../entities/writing-exercise.entity";
import { WritingTemplateModel } from "../../writing-template/models/writing-template.model";

@Table({
    tableName: "writing_exercises",
    timestamps: false,
})
export class WritingExerciseModel extends Model implements WritingExercise {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "writing_exercise_id",
    })
    _id: string;

    @ForeignKey(() => WritingTemplateModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "template_id",
    })
    template_id?: string;

    @Column({
        type: DataType.STRING(300),
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: "prompt_en",
    })
    prompt_en: string;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
        field: "evaluation_criteria",
    })
    evaluation_criteria?: any;
}
