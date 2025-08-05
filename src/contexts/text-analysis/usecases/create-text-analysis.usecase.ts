import { Result } from "@shared/protocols";
import { TextAnalysisModel } from "../domain/models/text-analysis-model.struct";
import {
  ICreateTextAnalysisUseCase,
  ICreateTextAnalysisUseCaseDTO,
} from "./_ports/create-text-analysis-usecase.struct";
import { ITextAnalysisRepository } from "./_ports/repositories/text-analysis-repository.struct";

export class CreateTextAnalysisUseCase implements ICreateTextAnalysisUseCase {
  constructor(
    private readonly textAnalysisRepository: ITextAnalysisRepository,
  ) {}

  async execute({
    text,
    sentiment,
    toxicity,
    frequent_words,
  }: ICreateTextAnalysisUseCaseDTO): Promise<Result<TextAnalysisModel>> {
    const textAnalysis = await this.textAnalysisRepository.create({
      text,
      sentiment,
      toxicity,
      frequent_words,
    });

    return Result.ok(textAnalysis);
  }
}
