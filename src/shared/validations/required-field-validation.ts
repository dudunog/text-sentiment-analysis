import { MissingParamError } from "@shared/errors";
import { IValidation } from "@shared/protocols/validation";
import { getDeepValue } from "@shared/utils/getDeepValue";
import { isEmpty } from "@shared/utils/isEmpty";

export class RequiredFieldValidation implements IValidation {
  constructor(private readonly fieldnames: string[] = []) {}

  validate(input: unknown): Error | null {
    if (typeof input !== "object" || input === null) {
      return new MissingParamError(this.fieldnames[0] || "body");
    }

    const missingField = this.fieldnames.find((field) => {
      const value = getDeepValue(input, field);
      return isEmpty(value);
    });

    if (missingField) {
      return new MissingParamError(missingField);
    }

    return null;
  }
}
