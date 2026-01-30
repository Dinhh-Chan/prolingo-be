import { PartialType } from "@nestjs/mapped-types";
import { ListeningContent } from "../entities/listening-content.entity";

export class ConditionListeningContentDto extends PartialType(
    ListeningContent,
) {}
