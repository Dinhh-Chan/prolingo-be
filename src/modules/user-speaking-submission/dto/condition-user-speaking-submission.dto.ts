import { PartialType } from "@nestjs/mapped-types";
import { UserSpeakingSubmission } from "../entities/user-speaking-submission.entity";

export class ConditionUserSpeakingSubmissionDto extends PartialType(
    UserSpeakingSubmission,
) {}
