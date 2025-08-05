import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";

export const makeSearchTermValidationFactory = (): IValidation => {
  return new Validator({
    required: ["term"],
    string: ["term"],
  });
};
