import { PartialType } from "@nestjs/mapped-types";
import { PlacementTest } from "../entities/placement-test.entity";

export class ConditionPlacementTestDto extends PartialType(PlacementTest) {}
