import { StrObjectId } from "@common/constant";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Lesson } from "../entities/lesson.entity";

@Table({
    tableName: "lessons",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class LessonModel extends Model implements Lesson {
    @StrObjectId()
    @Column({
        type: DataType.STRING(64),
        primaryKey: true,
        field: "lesson_id",
    })
    _id: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
        field: "module_id",
    })
    module_id: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
        field: "name_en",
    })
    name_en: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
        field: "name_vi",
    })
    name_vi: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "order_index",
    })
    order_index: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "lesson_type",
    })
    lesson_type?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "estimated_minutes",
    })
    estimated_minutes?: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "created_at",
    })
    createdAt?: Date;
}
