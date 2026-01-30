import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { ExampleSentence } from "../entities/example-sentence.entity";

export interface ExampleSentenceRepository
    extends BaseRepository<ExampleSentence> {}
