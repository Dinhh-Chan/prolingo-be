import { PartialType } from "@nestjs/mapped-types";
import { CreateUserSpeakingAttemptDto } from "./create-user-speaking-attempt.dto";

export class UpdateUserSpeakingAttemptDto extends PartialType(
    CreateUserSpeakingAttemptDto,
) {}
