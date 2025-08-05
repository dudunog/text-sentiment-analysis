import { SearchTermController } from "@contexts/text-analysis/controllers/search-term.controller";
import { SearchTermUseCase } from "@contexts/text-analysis/usecases/search-term.usecase";
import { Controller } from "@shared/protocols";
import { TextAnalysisRepository } from "@contexts/text-analysis/external/repositories/text-analysis.repository";
import { makeSearchTermValidationFactory } from "./search-term-validation.factory";

export const makeSearchTermFactory = (): Controller => {
  const textAnalysisRepository = new TextAnalysisRepository();

  const searchTermUseCase = new SearchTermUseCase(textAnalysisRepository);

  const validation = makeSearchTermValidationFactory();

  const searchTermController = new SearchTermController(
    searchTermUseCase,
    validation,
  );

  return searchTermController;
};
