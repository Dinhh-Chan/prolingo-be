import { PartialType } from "@nestjs/mapped-types";
import { Industry } from "../entities/industry.entity";

export class ConditionIndustryDto extends PartialType(Industry) {}
