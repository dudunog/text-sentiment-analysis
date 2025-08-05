import { TextAnalysisModel } from "@contexts/text-analysis/domain/models/text-analysis-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export interface IAnalyzeTextUseCaseRequest {
  text: string;
}

export type IAnalyzeTextUseCaseResponse = Pick<
  TextAnalysisModel,
  "text" | "sentiment" | "frequent_words"
> & {
  total_words: number;
  toxicity: string;
};

export type IAnalyzeTextUseCase = UseCase<
  IAnalyzeTextUseCaseRequest,
  IAnalyzeTextUseCaseResponse
>;
