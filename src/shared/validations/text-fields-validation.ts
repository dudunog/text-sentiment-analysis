import { IValidation } from "@shared/protocols/validation";
import { InvalidTypeError } from "@shared/errors/invalid-type-error";
import { isEmpty } from "@shared/utils/isEmpty";
import { getDeepValue } from "@shared/utils/getDeepValue";

export class TextFieldsValidation implements IValidation {
  constructor(private readonly fieldnames: string[] = []) {}

  validate(input: unknown): Error | null {
    if (typeof input !== "object") return null;

    const invalidField = this.fieldnames.find((field) => {
      const value = getDeepValue(input, field);
      return !isEmpty(value) && typeof value !== "string";
    });

    if (invalidField) {
      return new InvalidTypeError(invalidField, "string");
    }

    return null;
  }
}
