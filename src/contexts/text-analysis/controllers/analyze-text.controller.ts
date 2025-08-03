import { IValidation } from "@shared/protocols/validation";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { IAnalyzeTextUseCase } from "../usecases/_ports/analyze-text-usecase.struct";

export class AnalyzeTextController implements Controller {
  constructor(
    private readonly analyzeTextUseCase: IAnalyzeTextUseCase,
    private readonly validation: IValidation,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);

      if (error) {
        return badRequest(error);
      }

      const { text } = request.body;

      const result = await this.analyzeTextUseCase.execute({ text });

      if (result.isFailure) {
        return badRequest(result.error);
      }

      return ok(result.getValue());
    } catch (error) {
      return serverError(error);
    }
  }
}
