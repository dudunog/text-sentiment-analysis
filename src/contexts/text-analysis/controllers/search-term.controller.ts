import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { ISearchTermUseCase } from "../usecases/_ports/search-term-usecase.struct";

export class SearchTermController {
  constructor(
    private readonly searchTermUseCase: ISearchTermUseCase,
    private readonly validation: IValidation,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.query);

      if (error) {
        return badRequest(error);
      }

      const { term } = request.query;

      const result = await this.searchTermUseCase.execute({ term });

      if (result.isFailure) {
        return badRequest(result.error);
      }

      return ok(result.getValue());
    } catch (error) {
      return serverError(error);
    }
  }
}
