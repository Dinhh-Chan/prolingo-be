import { PartialType } from "@nestjs/mapped-types";
import { ExampleSentence } from "../entities/example-sentence.entity";

export class ConditionExampleSentenceDto extends PartialType(ExampleSentence) {}
