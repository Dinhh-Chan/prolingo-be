import { PartialType } from "@nestjs/mapped-types";
import { CreateUserSkillStatDto } from "./create-user-skill-stat.dto";

export class UpdateUserSkillStatDto extends PartialType(
    CreateUserSkillStatDto,
) {}
