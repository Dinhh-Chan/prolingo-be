import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { Concept } from "../entities/concept.entity";

export interface ConceptRepository extends BaseRepository<Concept> {}
