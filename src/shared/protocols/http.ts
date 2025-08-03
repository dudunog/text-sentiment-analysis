export interface HttpResponse {
  statusCode: number;
  body: unknown;
}

export interface HttpRequest {
  params?: unknown;
  query?: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  headers?: unknown;
}

export interface HttpNextFunction {
  (error?: Error): void;
}
