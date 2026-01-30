import { PartialType } from "@nestjs/mapped-types";
import { CreateSpeakingExerciseDto } from "./create-speaking-exercise.dto";

export class UpdateSpeakingExerciseDto extends PartialType(
    CreateSpeakingExerciseDto,
) {}
