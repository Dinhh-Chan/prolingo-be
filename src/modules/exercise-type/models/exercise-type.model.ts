import { StrObjectId } from "@common/constant";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ExerciseType } from "../entities/exercise-type.entity";

@Table({
    tableName: "exercise_types",
    timestamps: false,
})
export class ExerciseTypeModel extends Model implements ExerciseType {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "type_id",
    })
    _id: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: "name_en",
    })
    name_en: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: "name_vi",
    })
    name_vi: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    code: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "skill_category",
    })
    skill_category?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_active",
    })
    is_active?: boolean;
}
