import { PartialType } from "@nestjs/mapped-types";
import { ConceptCertification } from "../entities/concept-certification.entity";

export class ConditionConceptCertificationDto extends PartialType(
    ConceptCertification,
) {}
