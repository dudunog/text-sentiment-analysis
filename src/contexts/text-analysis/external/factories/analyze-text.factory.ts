import { AnalyzeTextController } from "@contexts/text-analysis/controllers/analyze-text.controller";
import { AnalyzeTextUseCase } from "@contexts/text-analysis/usecases/analyze-text.usecase";
import { Controller } from "@shared/protocols";
import { makeHuggingFaceProvider } from "@shared/providers/hugging-face/factories/hugging-face-provider.factory";
import { TextAnalysisRepository } from "../repositories/text-analysis.repository";
import { makeAnalyzeTextValidationFactory } from "./analyze-text-validation.factory";

export const makeAnalyzeTextFactory = (): Controller => {
  const analyzeTextRepository = new TextAnalysisRepository();

  const analyzeTextUseCase = new AnalyzeTextUseCase(
    analyzeTextRepository,
    makeHuggingFaceProvider(),
  );
  const validation = makeAnalyzeTextValidationFactory();

  const analyzeTextController = new AnalyzeTextController(
    analyzeTextUseCase,
    validation,
  );

  return analyzeTextController;
};
