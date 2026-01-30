import { PartialType } from "@nestjs/mapped-types";
import { CreateExerciseIndustryDto } from "./create-exercise-industry.dto";

export class UpdateExerciseIndustryDto extends PartialType(
    CreateExerciseIndustryDto,
) {}
