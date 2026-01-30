import { PartialType } from "@nestjs/mapped-types";
import { CreatePlacementTestDto } from "./create-placement-test.dto";

export class UpdatePlacementTestDto extends PartialType(
    CreatePlacementTestDto,
) {}
