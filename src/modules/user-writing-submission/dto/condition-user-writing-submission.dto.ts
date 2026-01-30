import { PartialType } from "@nestjs/mapped-types";
import { UserWritingSubmission } from "../entities/user-writing-submission.entity";

export class ConditionUserWritingSubmissionDto extends PartialType(
    UserWritingSubmission,
) {}
