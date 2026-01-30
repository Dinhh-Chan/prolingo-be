import { PartialType } from "@nestjs/mapped-types";
import { CreateListeningExerciseDto } from "./create-listening-exercise.dto";

export class UpdateListeningExerciseDto extends PartialType(
    CreateListeningExerciseDto,
) {}
