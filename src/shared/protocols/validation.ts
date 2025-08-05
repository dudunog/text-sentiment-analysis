export interface IValidation {
  validate: (input: unknown) => Error | null;
}

export interface IValidatorScheme {
  string?: string[];
  number?: string[];
  boolean?: string[];
  required?: string[];
  custom?: ((input: unknown) => Error | null)[];
}
