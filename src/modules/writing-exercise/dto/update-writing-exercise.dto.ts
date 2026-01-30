import { PartialType } from "@nestjs/mapped-types";
import { CreateWritingExerciseDto } from "./create-writing-exercise.dto";

export class UpdateWritingExerciseDto extends PartialType(
    CreateWritingExerciseDto,
) {}
