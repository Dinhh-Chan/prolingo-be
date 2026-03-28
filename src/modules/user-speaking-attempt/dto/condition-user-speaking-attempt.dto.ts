import { PartialType } from "@nestjs/mapped-types";
import { UserSpeakingAttempt } from "../entities/user-speaking-attempt.entity";

export class ConditionUserSpeakingAttemptDto extends PartialType(
    UserSpeakingAttempt,
) {}
