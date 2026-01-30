import { PartialType } from "@nestjs/mapped-types";
import { CreateExampleSentenceDto } from "./create-example-sentence.dto";

export class UpdateExampleSentenceDto extends PartialType(
    CreateExampleSentenceDto,
) {}
