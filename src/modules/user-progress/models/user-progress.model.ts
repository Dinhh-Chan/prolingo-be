import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from "sequelize-typescript";
import { UserProgress } from "../entities/user-progress.entity";
import { UserModel } from "@module/repository/sequelize/model/user.model";
import { LearningPathModel } from "../../learning-path/models/learning-path.model";
import { LearningModuleModel } from "../../learning-module/models/learning-module.model";
import { LessonModel } from "../../lesson/models/lesson.model";

@Table({
    tableName: "user_progress",
    timestamps: true,
    createdAt: false,
    updatedAt: "updated_at",
})
export class UserProgressModel extends Model implements UserProgress {
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "progress_id",
    })
    _id: string;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @ForeignKey(() => LearningPathModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "path_id",
    })
    path_id?: string;

    @ForeignKey(() => LearningModuleModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "module_id",
    })
    module_id?: string;

    @ForeignKey(() => LessonModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "lesson_id",
    })
    lesson_id?: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
    })
    status?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "completion_percentage",
    })
    completion_percentage?: number;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: "started_at",
    })
    started_at?: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: "completed_at",
    })
    completed_at?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "updated_at",
    })
    updatedAt?: Date;
}
