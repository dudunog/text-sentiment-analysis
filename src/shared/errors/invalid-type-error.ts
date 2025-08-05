export class InvalidTypeError extends Error {
  constructor(paramName: string, requiredType: string) {
    super(`Invalid Type: ${paramName} must be ${requiredType}`);
    this.name = "InvalidTypeError";
  }
}
