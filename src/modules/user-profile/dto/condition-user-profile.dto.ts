import { PartialType } from "@nestjs/mapped-types";
import { UserProfile } from "../entities/user-profile.entity";

export class ConditionUserProfileDto extends PartialType(UserProfile) {}
