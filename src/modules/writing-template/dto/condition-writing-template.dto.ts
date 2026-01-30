import { PartialType } from "@nestjs/mapped-types";
import { WritingTemplate } from "../entities/writing-template.entity";

export class ConditionWritingTemplateDto extends PartialType(WritingTemplate) {}
