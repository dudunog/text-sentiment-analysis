import { TextAnalysisModel } from "@contexts/text-analysis/domain/models/text-analysis-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export interface ISearchTermUseCaseRequest {
  term: string;
}

export interface ISearchTermUseCaseResponse {
  analyses: Pick<
    TextAnalysisModel,
    "text" | "sentiment" | "toxicity" | "frequent_words" | "created_at"
  >[];
  total_found: number;
  search_term: string;
}

export type ISearchTermUseCase = UseCase<
  ISearchTermUseCaseRequest,
  ISearchTermUseCaseResponse
>;
