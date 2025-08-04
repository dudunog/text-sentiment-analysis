import { TextAnalysisModel } from "@contexts/text-analysis/domain/models/text-analysis-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export interface ISearchTermUseCaseRequest {
  term: string;
}

export interface ISearchTermUseCaseResponse {
  analyses: Pick<
    TextAnalysisModel,
    "text" | "sentiment" | "frequent_words" | "created_at"
  >[];
  totalFound: number;
  searchTerm: string;
}

export type ISearchTermUseCase = UseCase<
  ISearchTermUseCaseRequest,
  ISearchTermUseCaseResponse
>;
