import { PartialType } from "@nestjs/mapped-types";
import { CreateReadingContentDto } from "./create-reading-content.dto";

export class UpdateReadingContentDto extends PartialType(
    CreateReadingContentDto,
) {}
