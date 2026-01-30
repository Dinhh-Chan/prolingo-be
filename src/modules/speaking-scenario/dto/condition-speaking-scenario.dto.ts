import { PartialType } from "@nestjs/mapped-types";
import { SpeakingScenario } from "../entities/speaking-scenario.entity";

export class ConditionSpeakingScenarioDto extends PartialType(
    SpeakingScenario,
) {}
