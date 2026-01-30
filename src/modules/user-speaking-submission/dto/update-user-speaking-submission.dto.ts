import { PartialType } from "@nestjs/mapped-types";
import { CreateUserSpeakingSubmissionDto } from "./create-user-speaking-submission.dto";

export class UpdateUserSpeakingSubmissionDto extends PartialType(
    CreateUserSpeakingSubmissionDto,
) {}
