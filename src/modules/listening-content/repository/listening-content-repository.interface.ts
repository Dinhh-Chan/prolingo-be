import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { ListeningContent } from "../entities/listening-content.entity";

export interface ListeningContentRepository
    extends BaseRepository<ListeningContent> {}
