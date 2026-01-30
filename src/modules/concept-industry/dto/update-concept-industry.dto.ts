import { PartialType } from "@nestjs/mapped-types";
import { CreateConceptIndustryDto } from "./create-concept-industry.dto";

export class UpdateConceptIndustryDto extends PartialType(
    CreateConceptIndustryDto,
) {}
