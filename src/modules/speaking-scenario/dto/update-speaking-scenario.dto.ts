import { PartialType } from "@nestjs/mapped-types";
import { CreateSpeakingScenarioDto } from "./create-speaking-scenario.dto";

export class UpdateSpeakingScenarioDto extends PartialType(
    CreateSpeakingScenarioDto,
) {}
