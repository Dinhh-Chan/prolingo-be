import { PartialType } from "@nestjs/mapped-types";
import { ConceptIndustry } from "../entities/concept-industry.entity";

export class ConditionConceptIndustryDto extends PartialType(ConceptIndustry) {}
