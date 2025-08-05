import { Result } from "@shared/protocols";
import { IHuggingFaceProvider } from "@shared/providers/hugging-face/hugging-face.struct";
import { getTopWords } from "@shared/utils/getTopWords";
import {
  IAnalyzeTextUseCase,
  IAnalyzeTextUseCaseRequest,
  IAnalyzeTextUseCaseResponse,
} from "./_ports/analyze-text-usecase.struct";
import { ITextAnalysisRepository } from "./_ports/repositories/text-analysis-repository.struct";

const TEXT_CLEANUP_REGEX = /[^\w\s]/g;

export class AnalyzeTextUseCase implements IAnalyzeTextUseCase {
  constructor(
    private readonly textAnalysisRepository: ITextAnalysisRepository,
    private readonly huggingFaceService: IHuggingFaceProvider,
  ) {}

  async execute({
    text,
  }: IAnalyzeTextUseCaseRequest): Promise<Result<IAnalyzeTextUseCaseResponse>> {
    try {
      const sentimentAnalysis =
        await this.huggingFaceService.analyzeSentiment(text);

      const toxicityAnalysis =
        await this.huggingFaceService.analyzeToxicity(text);

      const frequent_words = getTopWords(text, 5);

      const frequent_words_mapped = frequent_words.map((word) => word.word);

      const total_words = text
        .toLowerCase()
        .replace(TEXT_CLEANUP_REGEX, "")
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

      const textAnalysisCreated = await this.textAnalysisRepository.create({
        text,
        sentiment: sentimentAnalysis.sentiment,
        frequent_words: frequent_words_mapped,
      });

      const response = {
        text: textAnalysisCreated.text,
        sentiment: textAnalysisCreated.sentiment,
        frequent_words: textAnalysisCreated.frequent_words,
        total_words,
        toxicity: toxicityAnalysis.toxicity,
      };

      return Result.ok(response);
    } catch (error) {
      return Result.fail(new Error(`Error analyzing text: ${error}`));
    }
  }
}
