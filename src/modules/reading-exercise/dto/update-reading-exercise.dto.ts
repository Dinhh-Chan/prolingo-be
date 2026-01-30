import { PartialType } from "@nestjs/mapped-types";
import { CreateReadingExerciseDto } from "./create-reading-exercise.dto";

export class UpdateReadingExerciseDto extends PartialType(
    CreateReadingExerciseDto,
) {}
