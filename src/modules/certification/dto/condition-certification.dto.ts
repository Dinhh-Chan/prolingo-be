import { PartialType } from "@nestjs/mapped-types";
import { Certification } from "../entities/certification.entity";

export class ConditionCertificationDto extends PartialType(Certification) {}
