import { PartialType } from "@nestjs/mapped-types";
import { JobRole } from "../entities/job-role.entity";

export class ConditionJobRoleDto extends PartialType(JobRole) {}
