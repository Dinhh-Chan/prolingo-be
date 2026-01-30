import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { Exercise } from "../entities/exercise.entity";
import { ExerciseTypeModel } from "../../exercise-type/models/exercise-type.model";
import { ConceptModel } from "../../concept/models/concept.model";
import { VocabularyModel } from "../../vocabulary/models/vocabulary.model";

@Table({
    tableName: "exercises",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})
export class ExerciseModel extends Model implements Exercise {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "exercise_id",
    })
    _id: string;

    @ForeignKey(() => ExerciseTypeModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "type_id",
    })
    type_id: string;

    @ForeignKey(() => ConceptModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "concept_id",
    })
    concept_id?: string;

    @ForeignKey(() => VocabularyModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "vocab_id",
    })
    vocab_id?: string;

    @Column({
        type: DataType.STRING(300),
        allowNull: true,
    })
    title?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "instruction_en",
    })
    instruction_en?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: "instruction_vi",
    })
    instruction_vi?: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
        field: "difficulty_level",
    })
    difficulty_level?: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "skill_category",
    })
    skill_category?: string;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
    })
    content: any;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "duration_seconds",
    })
    duration_seconds?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 10,
    })
    points?: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "created_at",
    })
    createdAt?: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "updated_at",
    })
    updatedAt?: Date;
}
