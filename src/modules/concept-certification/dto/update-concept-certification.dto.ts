import { PartialType } from "@nestjs/mapped-types";
import { CreateConceptCertificationDto } from "./create-concept-certification.dto";

export class UpdateConceptCertificationDto extends PartialType(
    CreateConceptCertificationDto,
) {}
