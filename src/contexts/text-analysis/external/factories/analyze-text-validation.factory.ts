import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";

export const makeAnalyzeTextValidationFactory = (): IValidation => {
  return new Validator({
    required: ["text"],
    string: ["text"],
  });
};
