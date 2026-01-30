import { PartialType } from "@nestjs/mapped-types";
import { Concept } from "../entities/concept.entity";

export class ConditionConceptDto extends PartialType(Concept) {}
