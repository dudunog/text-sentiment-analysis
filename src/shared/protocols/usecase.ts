import { Result } from "@shared/protocols/result";

export interface UseCase<PayloadType, ResultType> {
  execute: (payload: PayloadType) => Promise<Result<ResultType>>;
}
