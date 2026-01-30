import { PartialType } from "@nestjs/mapped-types";
import { ListeningExercise } from "../entities/listening-exercise.entity";

export class ConditionListeningExerciseDto extends PartialType(
    ListeningExercise,
) {}
