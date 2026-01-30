import { PartialType } from "@nestjs/mapped-types";
import { CreateWritingTemplateDto } from "./create-writing-template.dto";

export class UpdateWritingTemplateDto extends PartialType(
    CreateWritingTemplateDto,
) {}
