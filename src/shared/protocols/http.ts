/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse {
  statusCode: number;
  body: unknown;
}

export interface HttpRequest {
  params?: unknown;
  query?: any;
  body?: any;
  headers?: unknown;
}

export interface HttpNextFunction {
  (error?: Error): void;
}
