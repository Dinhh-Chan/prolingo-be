import { PartialType } from "@nestjs/mapped-types";
import { ExerciseIndustry } from "../entities/exercise-industry.entity";

export class ConditionExerciseIndustryDto extends PartialType(
    ExerciseIndustry,
) {}
