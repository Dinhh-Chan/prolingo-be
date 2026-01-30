import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { Vocabulary } from "../entities/vocabulary.entity";

export interface VocabularyRepository extends BaseRepository<Vocabulary> {}
