import { IValidation, IValidatorScheme } from "@shared/protocols/validation";
import { RequiredFieldValidation, TextFieldsValidation } from "./index";

export class Validator implements IValidation {
  constructor(private readonly validations: IValidatorScheme = {}) {}

  validate(input: unknown): Error | null {
    const validationsScheme: Partial<
      Record<keyof IValidatorScheme, IValidation>
    > = {
      required: new RequiredFieldValidation(this.validations.required),
      string: new TextFieldsValidation(this.validations.string),
    };

    const validationError = Object.keys(validationsScheme).find(
      (validationKey) => {
        const validation =
          validationsScheme[validationKey as keyof IValidatorScheme];

        const error = validation.validate(input);
        return error;
      },
    );

    if (validationError) {
      const validation =
        validationsScheme[validationError as keyof IValidatorScheme];
      return validation.validate(input);
    }

    return null;
  }
}
