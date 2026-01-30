import { PartialType } from "@nestjs/mapped-types";
import { ReadingContent } from "../entities/reading-content.entity";

export class ConditionReadingContentDto extends PartialType(ReadingContent) {}
