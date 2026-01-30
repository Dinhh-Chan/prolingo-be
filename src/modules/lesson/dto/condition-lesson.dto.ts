import { PartialType } from "@nestjs/mapped-types";
import { Lesson } from "../entities/lesson.entity";

export class ConditionLessonDto extends PartialType(Lesson) {}
