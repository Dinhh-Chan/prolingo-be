import { StrObjectId } from "@common/constant";
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    PrimaryKey,
} from "sequelize-typescript";
import { ConceptCertification } from "../entities/concept-certification.entity";
import { ConceptModel } from "../../concept/models/concept.model";
import { CertificationModel } from "../../certification/models/certification.model";

@Table({
    tableName: "concept_certifications",
    timestamps: false,
})
export class ConceptCertificationModel
    extends Model
    implements ConceptCertification
{
    @PrimaryKey
    @ForeignKey(() => ConceptModel)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        field: "concept_id",
    })
    concept_id: string;

    @PrimaryKey
    @ForeignKey(() => CertificationModel)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
        field: "certification_id",
    })
    certification_id: string;

    @StrObjectId()
    get _id(): string {
        return this.concept_id;
    }

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
    })
    frequency?: string;
}
