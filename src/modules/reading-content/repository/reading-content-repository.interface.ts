import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { ReadingContent } from "../entities/reading-content.entity";

export interface ReadingContentRepository
    extends BaseRepository<ReadingContent> {}
