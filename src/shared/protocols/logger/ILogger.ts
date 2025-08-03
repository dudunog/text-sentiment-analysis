import { ILoggerDTO } from "./ilogger-dto";

export interface ILogger {
  info: (payload: ILoggerDTO) => void;
  error: (payload: ILoggerDTO) => void;
  mapperInfo: (message: string) => void;
  mapperError: (message: string) => void;
}
