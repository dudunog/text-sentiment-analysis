/* eslint-disable no-use-before-define */
import winston, { Logger as Winston, LoggerOptions } from "winston";
import { ILogger } from "@shared/protocols/logger/ILogger";
import { ILoggerDTO } from "@shared/protocols/logger/ilogger-dto";

class Logger implements ILogger {
  static instance: Logger;

  static logger: Winston;

  static getInstance(options?: LoggerOptions): Logger {
    if (Logger.instance) {
      return Logger.instance;
    }

    Logger.instance = new Logger();

    Logger.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
      ...options,
    });

    return Logger.instance;
  }

  info({ type, message, file }: ILoggerDTO): void {
    Logger.logger.log("info", {
      type,
      file,
      message: message ?? "",
    });
  }

  error({ type, message, file }: ILoggerDTO): void {
    Logger.logger.log("error", {
      type,
      file,
      message: message ?? "",
    });
  }

  mapperInfo(message: string): void {
    Logger.logger.log("info", {
      message,
    });
  }

  mapperError(message: string) {
    Logger.logger.log("error", {
      message,
    });
  }
}

export default Logger.getInstance();
