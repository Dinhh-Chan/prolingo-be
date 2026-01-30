import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    PrimaryKey,
} from "sequelize-typescript";
import { ConceptVocabulary } from "../entities/concept-vocabulary.entity";
import { ConceptModel } from "../../concept/models/concept.model";
import { VocabularyModel } from "../../vocabulary/models/vocabulary.model";

@Table({
    tableName: "concept_vocabulary",
    timestamps: false,
})
export class ConceptVocabularyModel extends Model implements ConceptVocabulary {
    @PrimaryKey
    @ForeignKey(() => ConceptModel)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        field: "concept_id",
    })
    concept_id: string;

    @PrimaryKey
    @ForeignKey(() => VocabularyModel)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
        field: "vocab_id",
    })
    vocab_id: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "relationship_type",
    })
    relationship_type?: string;

    @StrObjectId()
    get _id(): string {
        return this.concept_id;
    }
}
