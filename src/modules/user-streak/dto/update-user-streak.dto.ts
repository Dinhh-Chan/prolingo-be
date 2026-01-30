import { PartialType } from "@nestjs/mapped-types";
import { CreateUserStreakDto } from "./create-user-streak.dto";

export class UpdateUserStreakDto extends PartialType(CreateUserStreakDto) {}
