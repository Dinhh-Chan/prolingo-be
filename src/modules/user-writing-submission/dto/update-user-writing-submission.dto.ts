import { PartialType } from "@nestjs/mapped-types";
import { CreateUserWritingSubmissionDto } from "./create-user-writing-submission.dto";

export class UpdateUserWritingSubmissionDto extends PartialType(
    CreateUserWritingSubmissionDto,
) {}
