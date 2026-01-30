import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    Unique,
} from "sequelize-typescript";
import { UserVocabularyStat } from "../entities/user-vocabulary-stat.entity";
import { User } from "../../user/entities/user.entity";
import { IndustryModel } from "../../industry/models/industry.model";
import { CertificationModel } from "../../certification/models/certification.model";

@Table({
    tableName: "user_vocabulary_stats",
    timestamps: true,
    createdAt: false,
    updatedAt: "last_updated",
    indexes: [
        {
            unique: true,
            fields: ["user_id", "industry_id", "certification_id"],
        },
    ],
})
export class UserVocabularyStatModel
    extends Model
    implements UserVocabularyStat
{
    @StrObjectId()
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: "stat_id",
    })
    _id: string;

    @Unique("user_industry_cert_unique")
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    user_id: string;

    @Unique("user_industry_cert_unique")
    @ForeignKey(() => IndustryModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "industry_id",
    })
    industry_id?: string;

    @Unique("user_industry_cert_unique")
    @ForeignKey(() => CertificationModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "certification_id",
    })
    certification_id?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "total_vocabulary",
    })
    total_vocabulary?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "mastered_vocabulary",
    })
    mastered_vocabulary?: number;

    @Column({
        type: DataType.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0,
        field: "coverage_percentage",
    })
    coverage_percentage?: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "last_updated",
    })
    createdAt?: Date;
}
