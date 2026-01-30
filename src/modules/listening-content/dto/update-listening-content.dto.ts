import { PartialType } from "@nestjs/mapped-types";
import { CreateListeningContentDto } from "./create-listening-content.dto";

export class UpdateListeningContentDto extends PartialType(
    CreateListeningContentDto,
) {}
