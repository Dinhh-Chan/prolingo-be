import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    PrimaryKey,
} from "sequelize-typescript";
import { ConceptIndustry } from "../entities/concept-industry.entity";
import { ConceptModel } from "../../concept/models/concept.model";
import { IndustryModel } from "../../industry/models/industry.model";

@Table({
    tableName: "concept_industries",
    timestamps: false,
})
export class ConceptIndustryModel extends Model implements ConceptIndustry {
    @PrimaryKey
    @ForeignKey(() => ConceptModel)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        field: "concept_id",
    })
    concept_id: string;

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
        return this.concept_id;
    }

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 5,
        field: "relevance_score",
    })
    relevance_score?: number;
}
