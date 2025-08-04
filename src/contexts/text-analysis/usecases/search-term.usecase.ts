import { Result } from "@shared/protocols";
import { TextAnalysisModel } from "../domain/models/text-analysis-model.struct";
import {
  ISearchTermUseCase,
  ISearchTermUseCaseRequest,
  ISearchTermUseCaseResponse,
} from "./_ports/search-term-usecase.struct";
import { ITextAnalysisRepository } from "./_ports/repositories/text-analysis-repository.struct";

export class SearchTermUseCase implements ISearchTermUseCase {
  constructor(
    private readonly textAnalysisRepository: ITextAnalysisRepository,
  ) {}

  async execute({
    term,
  }: ISearchTermUseCaseRequest): Promise<Result<ISearchTermUseCaseResponse>> {
    try {
      const normalizedTerm = this.normalizeSearchTerm(term);
      const allAnalyses = await this.textAnalysisRepository.list();

      const matchingAnalyses = this.findMatchingAnalyses(
        allAnalyses,
        normalizedTerm,
      );

      const searchResult: ISearchTermUseCaseResponse = {
        analyses: matchingAnalyses,
        totalFound: matchingAnalyses.length,
        searchTerm: term,
      };

      const analyses = searchResult.analyses.map((analysis) => ({
        text: analysis.text,
        sentiment: analysis.sentiment,
        frequent_words: analysis.frequent_words,
        created_at: analysis.created_at,
      }));

      return Result.ok({
        analyses,
        totalFound: searchResult.totalFound,
        searchTerm: searchResult.searchTerm,
      });
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  private normalizeSearchTerm(term: string): string {
    return term.toLowerCase().trim();
  }

  private findMatchingAnalyses(
    analyses: TextAnalysisModel[],
    searchTerm: string,
  ): TextAnalysisModel[] {
    return analyses.filter((analysis) =>
      this.analysisContainsTerm(analysis, searchTerm),
    );
  }

  private analysisContainsTerm(
    analysis: TextAnalysisModel,
    searchTerm: string,
  ): boolean {
    const hasInFrequentWords = analysis.frequent_words.some((word) =>
      word.toLowerCase().includes(searchTerm),
    );

    if (hasInFrequentWords) {
      return true;
    }

    return analysis.text.toLowerCase().includes(searchTerm);
  }
}
