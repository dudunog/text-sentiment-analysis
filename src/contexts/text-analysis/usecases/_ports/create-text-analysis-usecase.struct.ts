import { TextAnalysisModel } from "@contexts/text-analysis/domain/models/text-analysis-model.struct";
import { UseCase } from "@shared/protocols";

export interface ICreateTextAnalysisUseCaseDTO {
  text: string;
  sentiment: string;
  frequent_words: string[];
}

export type ICreateTextAnalysisUseCase = UseCase<
  ICreateTextAnalysisUseCaseDTO,
  TextAnalysisModel
>;
