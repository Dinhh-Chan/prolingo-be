import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserVocabularySet } from "../entities/user-vocabulary-set.entity";

export interface UserVocabularySetRepository
    extends BaseRepository<UserVocabularySet> {}
