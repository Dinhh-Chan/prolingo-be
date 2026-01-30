import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { UserVocabularyItem } from "../entities/user-vocabulary-item.entity";

export interface UserVocabularyItemRepository
    extends BaseRepository<UserVocabularyItem> {}
